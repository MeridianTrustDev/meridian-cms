import { mongooseAdapter } from '@payloadcms/db-mongodb'
// import { payloadCloud } from '@payloadcms/plugin-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload/config'
// import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { azureBlobStorageAdapter } from '@payloadcms/plugin-cloud-storage/azure'
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
  },
  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://stratton.school',
    'https://stratton-school.vercel.app',
  ],
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://stratton.school',
    'https://stratton-school.vercel.app',
  ],
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
          // generateFileURL: (file) => {
          //   return `${process.env.AZURE_STORAGE_BASE_URL}/${file.path}`
          // }
        },
      },
    }),
    seo({
      collections: ['pages'],
      generateTitle,
      uploadsCollection: 'media',
    }),
  ],
})
