import { Block, Field } from 'payload/types'
import { MediaBlock } from '../MediaBlock'
import { Text } from '../Content'
import { ArrayRowLabel } from './RowLabel'

export const File: Block = {
  slug: 'fileBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          defaultValue: 'named',
          name: 'mode',
          type: 'radio',
          options: [
            {
              label: 'Named',
              value: 'named',
            },
            {
              label: 'By Category',
              value: 'byCategory',
            },
          ],
        },
        {
          name: 'categories',
          type: 'array',
          admin: {
            condition: (_, siblingData) => siblingData.mode === 'byCategory',
          },
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'files',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData.mode === 'named',
        components: {
          RowLabel: ArrayRowLabel,
        },
      },
      fields: [
        {
          name: 'embed',
          type: 'checkbox',
          label: 'Embed',
          defaultValue: false,
        },
        {
          name: 'reference',
          label: 'File',
          type: 'relationship',
          relationTo: 'media',
          required: true,
          maxDepth: 1,
        },
      ],
    },
  ],
}
