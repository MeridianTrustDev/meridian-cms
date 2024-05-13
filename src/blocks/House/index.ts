import { Block, Field } from 'payload/types'
import { MediaBlock } from '../MediaBlock'
import { Text } from '../Content'
import { ArrayRowLabel } from './RowLabel'

export const Buttons: Block = {
  slug: 'houseBlock',
  fields: [
    {
      name: 'house',
      type: 'array',
      admin: {
        components: {
          RowLabel: ArrayRowLabel,
        },
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'houseColour',
          type: 'text',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'target',
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
                condition: (_, siblingData) => siblingData?.target === 'custom',
                width: '50%',
                style: {
                  alignSelf: 'flex-end',
                },
              },
            },
          ],
        },
        {
          name: 'linkTo',
          label: 'Page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          maxDepth: 1,
          filterOptions: ({ data }) => {
            return {
              tenant: {
                equals: data?.tenant,
              },
            }
          },
        },
      ],
    },
  ],
}
