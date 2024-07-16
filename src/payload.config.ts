import { mongooseAdapter } from '@payloadcms/db-mongodb'
// import { payloadCloud } from '@payloadcms/plugin-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
// import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { azureStorage } from '@payloadcms/storage-azure'

import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

import Logo from './components/graphics/Logo'
import Icon from './components/graphics/Icon'

import { Tenants } from './collections/Tenants'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { Headers } from './collections/Headers'
import { Navigation } from './collections/Navigation'

import { seoPlugin } from '@payloadcms/plugin-seo'
import { Events } from './collections/Events'
import { Footers } from './collections/Footers'
import { News } from './collections/News'
import { Categories } from './collections/Categories'
import { Houses } from './collections/Houses'

import { fieldsSelect } from '@payload-enchants/fields-select'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle = () => {
  return 'Stratton School'
}

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
  },
  indexSortableFields: true,
  collections: [
    Categories,
    Events,
    Footers,
    Houses,
    Media,
    Headers,
    Navigation,
    News,
    Pages,
    Tenants,
    Users,
  ],
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
    connectOptions: {
      dbName: 'payload',
    },
    transactionOptions: false,
  }),

  plugins: [
    azureStorage({
      collections: {
        media: {
          generateFileURL: (file) => `${process.env.AZURE_STORAGE_BASE_URL}/media/${file.filename}`,
        },
      },
      connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING!,
      containerName: process.env.AZURE_STORAGE_CONTAINER_NAME!,
      allowContainerCreate: true,
      baseURL: process.env.AZURE_STORAGE_BASE_URL!,
    }),
    seoPlugin({
      collections: ['pages'],
      generateTitle,
      uploadsCollection: 'media',
    }),
    nestedDocsPlugin({
      collections: ['pages'],
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
      generateLabel: (doc, currentDoc) => currentDoc.title as string,
    }),
    fieldsSelect(),
  ],
})
