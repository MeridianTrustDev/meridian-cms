import { CollectionConfig } from 'payload/types'
import { tenant } from '../../fields/tenant'
import { loggedIn } from '../Pages/access/loggedIn'
import { tenantAdmins } from '../Pages/access/tenantAdmins'
import { ArrayRowLabel } from '@/components/RowLabel'
import { tenants } from './access/tenants'
import { revalidate } from './hooks/revalidate'

export const Navigation: CollectionConfig = {
  slug: 'navigationMenu',
  access: {
    read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  hooks: {
    afterChange: [revalidate],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tenant'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Primary',
          value: 'primary',
        },
        {
          label: 'Secondary',
          value: 'secondary',
        },
        {
          label: 'Footer',
          value: 'footer',
        },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      labels: {
        singular: 'Nav Item',
        plural: 'Nav Items',
      },
      admin: {
        components: {
          RowLabel: ArrayRowLabel,
        },
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'radio',
              options: [
                {
                  label: 'Page',
                  value: 'reference',
                },
                {
                  label: 'Custom URL',
                  value: 'custom',
                },
                {
                  label: 'Parent',
                  value: 'parent',
                },
              ],
              defaultValue: 'reference',
              admin: {
                layout: 'horizontal',
                width: '50%',
              },
            },
            {
              name: 'newTab',
              label: 'Open in new tab',
              type: 'checkbox',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
                width: '50%',
                style: {
                  alignSelf: 'flex-end',
                },
              },
            },
          ],
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'showLabel',
          label: 'Show Label',
          type: 'checkbox',
          admin: {
            condition: (_) => _.type === 'secondary',
          },
        },
        {
          name: 'reference',
          label: 'Page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          maxDepth: 2,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'reference',
          },
        },
        {
          name: 'url',
          label: 'Custom URL',
          type: 'text',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
          },
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'text',
          admin: {
            condition: (_) => _.type === 'secondary',
          },
        },
        {
          name: 'children',
          label: 'Children',
          type: 'array',
          admin: {
            components: {
              RowLabel: ArrayRowLabel,
            },
            condition: (_, siblingData) => siblingData?.type === 'parent',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'type',
                  type: 'radio',
                  options: [
                    {
                      label: 'Page',
                      value: 'reference',
                    },
                    {
                      label: 'Custom URL',
                      value: 'custom',
                    },
                    {
                      label: 'Parent',
                      value: 'parent',
                    },
                  ],
                  defaultValue: 'reference',
                  admin: {
                    layout: 'horizontal',
                    width: '50%',
                  },
                },
                {
                  name: 'newTab',
                  label: 'Open in new tab',
                  type: 'checkbox',
                  admin: {
                    width: '50%',
                    style: {
                      alignSelf: 'flex-end',
                    },
                  },
                },
              ],
            },
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              required: true,
            },
            {
              name: 'reference',
              label: 'Page',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
              maxDepth: 2,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
              },
            },
            {
              name: 'url',
              label: 'Custom URL',
              type: 'text',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
              },
            },
            {
              name: 'children',
              label: 'Children',
              type: 'array',
              admin: {
                components: {
                  RowLabel: ArrayRowLabel,
                },
                condition: (_, siblingData) => siblingData?.type === 'parent',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'type',
                      type: 'radio',
                      options: [
                        {
                          label: 'Internal link',
                          value: 'reference',
                        },
                        {
                          label: 'Custom URL',
                          value: 'custom',
                        },
                      ],
                      defaultValue: 'reference',
                      admin: {
                        layout: 'horizontal',
                        width: '50%',
                      },
                    },
                    {
                      name: 'newTab',
                      label: 'Open in new tab',
                      type: 'checkbox',
                      admin: {
                        width: '50%',
                        style: {
                          alignSelf: 'flex-end',
                        },
                      },
                    },
                  ],
                },
                {
                  name: 'label',
                  label: 'Label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'reference',
                  label: 'Page',
                  type: 'relationship',
                  relationTo: 'pages',
                  required: true,
                  maxDepth: 2,
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'reference',
                  },
                },
                {
                  name: 'url',
                  label: 'Custom URL',
                  type: 'text',
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'custom',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    tenant,
  ],
}
