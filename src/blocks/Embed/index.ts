import { Block } from 'payload/types'

export const Embed: Block = {
  slug: 'embedBlock',
  fields: [
    {
      name: 'embed',
      label: 'Embed',
      type: 'textarea',
    },
  ],
}
