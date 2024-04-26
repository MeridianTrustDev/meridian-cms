import { mongooseAdapter } from '@payloadcms/db-mongodb'
// import { payloadCloud } from '@payloadcms/plugin-cloud'
import { lexicalEditor, HTMLConverterFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload/config'
// import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { azureBlobStorageAdapter } from '@payloadcms/plugin-cloud-storage/azure'
import { nestedDocs } from '@payloadcms/plugin-nested-docs'

import Logo from './components/graphics/Logo'
import Icon from './components/graphics/Icon'

import { Tenants } from './collections/Tenants'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { Headers } from './collections/Headers'
import { Navigation } from './collections/Navigation'

import { seo } from '@payloadcms/plugin-seo'
import type {} from '@payloadcms/plugin-seo'
import { Events } from './collections/Events'
import { Footers } from './collections/Footers'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle = () => {
  return 'Stratton School'
}

const adapter = azureBlobStorageAdapter({
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING!,
  containerName: process.env.AZURE_STORAGE_CONTAINER_NAME!,
  allowContainerCreate: true,
  baseURL: process.env.AZURE_STORAGE_BASE_URL!,
})

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
<<<<<<< HEAD
    // livePreview: {
    //   url(args) {
    //     console.log(args)
    //     return `${args.data}`
    //   },
    //   breakpoints: [
    //     {
    //       label: 'Mobile',
    //       name: 'mobile',
    //       width: 375,
    //       height: 667,
    //     },
    //   ],
    // },
=======
>>>>>>> parent of c4c52b8 (1)
  },
  indexSortableFields: true,
  collections: [Events, Headers, Footers, Navigation, Users, Tenants, Pages, Media],
  upload: {
    limits: {
      fileSize: 5,
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
    cloudStorage({
      collections: {
        media: {
          adapter: adapter,
          disableLocalStorage: true,
        },
      },
    }),
    seo({
      collections: ['pages'],
      generateTitle,
      uploadsCollection: 'media',
    }),
    nestedDocs({
      collections: ['pages'],
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
      generateLabel: (doc, currentDoc) => currentDoc.title as string,
    }),
  ],
})
