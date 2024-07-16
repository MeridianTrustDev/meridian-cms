import { Block, Field } from 'payload'
export const News: Block = {
  slug: 'newsBlock',
  fields: [
    {
      type: 'select',
      name: 'mode',
      label: 'Mode',
      options: [
        {
          label: 'Carousel',
          value: 'carousel',
        },
        {
          label: 'List',
          value: 'list',
        },
      ],
    },
    // {
    //   name: 'category',
    //   type: 'relationship',
    //   relationTo: 'categories',
    // },
    {
      name: 'limit',
      type: 'number',
    },
  ],
}
