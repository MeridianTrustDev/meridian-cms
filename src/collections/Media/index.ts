import { CollectionConfig } from 'payload/types'
import { tenant } from '@/fields/tenant'
import { tenants } from './access/tenants'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: {
    read: tenants,
  },
  fields: [
    {
      name: 'alt',
      label: 'Friendly Name of Document / Description of Image',
      type: 'text',
      required: true,
    },
    {
      name: 'categories',
      type: 'array',
      fields: [
        { type: 'relationship', name: 'category', relationTo: 'categories', required: true },
      ],
    },
    tenant,
  ],
}
