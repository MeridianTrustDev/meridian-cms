import { HTMLConverterFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Text: Block = {
  slug: 'text',
  fields: [
    {
      name: 'text',
      label: 'Text',
      type: 'richText',
      editor: lexicalEditor({}),
    },
  ],
}
