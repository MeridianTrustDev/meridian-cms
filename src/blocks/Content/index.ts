import { HTMLConverterFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload/types'

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
