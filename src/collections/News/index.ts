import { CollectionConfig } from 'payload/types'
import { tenants } from './access/tenants'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import formatSlug from './hooks/formatSlug'
import { tenant } from '../../fields/tenant'
import { MediaBlock } from '../../blocks/MediaBlock'
import { Columns } from '../../blocks/Columns'
import { Text } from '../../blocks/Content'
import { Buttons } from '@/blocks/Buttons'
import { Events } from '@/blocks/Events'
import { File } from '@/blocks/File'
import { MediaAndText } from '@/blocks/MediaAndText'
import { Vacancies } from '@/blocks/Vacancies'
import { revalidateNews } from './hooks/revalidateNews'
import { Accordion } from '@/blocks/Accordion'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'tenant', 'updatedAt'],
  },
  versions: {
    drafts: true,
    maxPerDoc: 5,
  },
  hooks: {
    afterChange: [revalidateNews],
  },
  access: {
    read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },

    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        Accordion,
        Buttons,
        Columns,
        Events,
        MediaBlock,
        MediaAndText,
        Text,
        File,
        Vacancies,
      ],
    },

    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    tenant,
  ],
}
