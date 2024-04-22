import { Block, Field } from 'payload/types'
import { MediaBlock } from '../MediaBlock'
import { Text } from '../Content'
import { ArrayRowLabel } from './RowLabel'

export const Buttons: Block = {
  slug: 'buttonsBlock',
  fields: [
    {
      name: 'buttons',
      type: 'array',
      admin: {
        components: {
          RowLabel: ArrayRowLabel,
        },
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: false,
        },
        {
          name: 'backgroundColour',
          type: 'text',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
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
          name: 'reference',
          label: 'Page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          maxDepth: 1,
          admin: {
            condition: (_, siblingData) => siblingData?.target === 'reference',
          },
        },
        {
          name: 'url',
          label: 'Custom URL',
          type: 'text',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.target === 'custom',
          },
        },
      ],
    },
  ],
}
