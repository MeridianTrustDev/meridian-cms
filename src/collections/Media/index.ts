import { CollectionConfig } from 'payload'
import { tenant } from '@/fields/tenant'
import { tenants } from './access/tenants'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    imageSizes: [
      {
        name: 'sm',
        width: 320,
        height: 320,
      },
      {
        name: 'md',
        width: 640,
        height: 640,
      },
      {
        name: 'lg',
        width: 1024,
        height: 1024,
      },
      {
        name: 'xl',
        width: 1280,
        height: 1280,
      },
    ],
  },
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
      admin: {
        initCollapsed: true,
      },
      fields: [
        { type: 'relationship', name: 'category', relationTo: 'categories', required: true },
      ],
    },
    tenant,
  ],
}
