import { CollectionConfig } from 'payload/types'
import { tenant } from '../../fields/tenant'
import { tenants } from '../Pages/access/tenants'
import { loggedIn } from '../Pages/access/loggedIn'
import { tenantAdmins } from '../Pages/access/tenantAdmins'
import colorPicker from '../../fields/colourPicker'
import iconPickerField from '../../fields/iconPickerField'

export const Navigation: CollectionConfig = {
  slug: 'navigationMenu',
  access: {
    read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
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
      admin: {
        components: {
          RowLabel: ({ data, index }) => {
            return data?.label || `Nav Item ${index + 1}`
          },
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
        },
        {
          name: 'reference',
          label: 'Page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          maxDepth: 1,
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
        colorPicker,
        iconPickerField,
        {
          name: 'children',
          label: 'Children',
          type: 'array',
          admin: {
            components: {
              RowLabel: ({ data, index }) => {
                return data?.label || `Nav Item ${index + 1}`
              },
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
              label: 'Internal Link',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
              maxDepth: 1,
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
                  RowLabel: ({ data, index }) => {
                    return data?.label || `Nav Item ${index + 1}`
                  },
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
                  label: 'Internal Link',
                  type: 'relationship',
                  relationTo: 'pages',
                  required: true,
                  maxDepth: 1,
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
