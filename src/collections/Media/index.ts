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
      name: 'name',
      label: 'Friendly Name',
      type: 'text',
    },
    {
      name: 'alt',
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
