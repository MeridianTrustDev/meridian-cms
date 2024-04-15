import IconInput from './input'
import { Field } from 'payload/types'

const iconPicker: Field = {
  name: 'iconPicker',
  label: 'Icon Picker',
  type: 'text',
  admin: {
    components: {
      Field: IconInput,
    },
  },
  hasMany: true, // Add the 'hasMany' property
}

export default iconPicker
