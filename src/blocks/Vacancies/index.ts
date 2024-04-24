import { Block } from 'payload/types'

export const Vacancies: Block = {
  slug: 'vacancies',
  labels: {
    singular: 'Vacancies Feed',
    plural: 'Vacancies Feed',
  },
  fields: [
    {
      name: 'myNewTermID',
      label: 'MyNewTerm ID',
      type: 'text',
    },
  ],
}
