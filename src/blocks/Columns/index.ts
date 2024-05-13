import { Block, Field } from 'payload/types'
import { MediaBlock } from '../MediaBlock'
import { Text } from '../Content'
import { Events } from '../Events'
import { News } from '../News'

export const Columns: Block = {
  slug: 'columnsBlock',
  fields: [
    {
      name: 'columns',
      label: 'Columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'content',
          type: 'blocks',
          required: true,
          blocks: [Events, MediaBlock, News, Text],
        },
      ],
    },
  ],
}
