import { CollectionBeforeReadHook, CollectionConfig } from 'payload/types'
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
import { revalidatePage } from './hooks/revalidatePage'
import { Accordion } from '@/blocks/Accordion'
import { News } from '@/blocks/News'
import { Embed } from '@/blocks/Embed'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'tenant', 'updatedAt'],
  },
  versions: {
    drafts: true,
    maxPerDoc: 5,
  },
  hooks: {
    afterChange: [revalidatePage],
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
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'type',
              type: 'select',
              defaultValue: 'page',
              options: [
                {
                  label: 'Page',
                  value: 'page',
                },
                {
                  label: 'Home',
                  value: 'home',
                },
              ],
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
              admin: {
                condition: (data) => data.type === 'page',
              },
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'hero',
              type: 'group',
              admin: {
                condition: (data) => data.type === 'home',
              },
              fields: [
                {
                  name: 'showHousePoints',
                  type: 'checkbox',
                },
                {
                  name: 'slides',
                  type: 'array',
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      filterOptions: {
                        mimeType: { contains: 'image' },
                      },
                    },
                    {
                      name: 'primaryText',
                      type: 'text',
                    },
                    {
                      name: 'secondaryText',
                      type: 'textarea',
                    },
                  ],
                },
              ],
            },
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [
                Accordion,
                Buttons,
                Columns,
                Embed,
                Events,
                MediaBlock,
                MediaAndText,
                News,
                Text,
                File,
                Vacancies,
              ],
            },
          ],
        },
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
