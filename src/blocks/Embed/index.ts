import { Block } from 'payload'

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
