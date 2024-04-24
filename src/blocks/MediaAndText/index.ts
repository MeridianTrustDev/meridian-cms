import { Block } from 'payload/types'

export const MediaAndText: Block = {
  slug: 'mediaAndText',
  fields: [
    {
      name: 'mediaPosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'text',
      type: 'richText',
      required: true,
    },
  ],
}
