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

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'tenant', 'updatedAt'],
    // livePreview: {
    //   url: async ({ data, payload }) => {
    //     const tenant = await payload.findByID({
    //       collection: 'tenants',
    //       id: data.tenant,
    //     })
    //     console.log(
    //       `${tenant.domains?.frontendDomain}${data.slug !== 'home' ? `/${data.slug}` : ''}`,
    //     )
    //     return `${tenant.domains?.frontendDomain}${data.slug !== 'home' ? `/${data.slug}` : ''}`
    //   },
    // },
  },
  versions: {
    drafts: true,
    maxPerDoc: 5,
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
              blocks: [Buttons, Columns, Events, MediaBlock, MediaAndText, Text, File, Vacancies],
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
