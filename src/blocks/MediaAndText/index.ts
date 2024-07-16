import { Block } from 'payload'

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
    {
      name: 'readMore',
      type: 'group',
      fields: [
        {
          name: 'showReadMore',
          type: 'checkbox',
          label: 'Show "Read More" button',
        },
        {
          name: 'readMoreText',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.showReadMore,
          },
        },
        {
          name: 'readMoreLink',
          type: 'group',
          admin: {
            condition: (_, siblingData) => siblingData.showReadMore,
          },
          fields: [
            {
              name: 'target',
              type: 'select',
              options: [
                {
                  label: 'Page',
                  value: 'page',
                },
                {
                  label: 'Custom URL',
                  value: 'custom',
                },
              ],
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              admin: {
                condition: (_, siblingData) => siblingData.target === 'page',
              },
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData.target === 'custom',
              },
            },
          ],
        },
      ],
    },
  ],
}
