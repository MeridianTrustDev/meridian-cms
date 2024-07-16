import { Block, Field } from 'payload'
import { MediaBlock } from '../MediaBlock'
import { Text } from '../Content'
import { ArrayRowLabel } from './RowLabel'
import { MediaAndText } from '../MediaAndText'
import { Embed } from '../Embed'
import { File } from '../File'

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
        initCollapsed: true,
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
          blocks: [Embed, File, Text, MediaBlock, MediaAndText],
        },
      ],
    },
  ],
}
