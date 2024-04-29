import { Block, Field } from 'payload/types'
import { MediaBlock } from '../MediaBlock'
import { Text } from '../Content'
import { ArrayRowLabel } from './RowLabel'
import { MediaAndText } from '../MediaAndText'

export const Accordion: Block = {
  slug: 'accordion',
  fields: [
    {
      name: 'items',
      type: 'array',
      admin: {
        components: {
          RowLabel: ArrayRowLabel,
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'blocks',
          required: true,
          blocks: [Text, MediaBlock, MediaAndText],
        },
      ],
    },
  ],
}
