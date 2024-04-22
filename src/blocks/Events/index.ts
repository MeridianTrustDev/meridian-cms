import { Block, Field } from 'payload/types'
export const Events: Block = {
  slug: 'eventsBlock',
  fields: [
    {
      type: 'select',
      name: 'mode',
      label: 'Mode',
      options: [
        {
          label: 'Calendar',
          value: 'calendar',
        },
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
    {
      name: 'limit',
      type: 'number',
    },
  ],
}
