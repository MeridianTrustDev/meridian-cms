import { Field } from 'payload/types'
import InputField from './InputField'
import Cell from './Cell'

export const validateHexColour = (value: string): true | string => {
  if (!value) return true
  return (
    value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/)?.length === 1 || `${value} is not a valid hex color`
  )
}

const colorPicker: Field = {
  name: 'color',
  type: 'text',
  validate: validateHexColour,
  required: false,
  admin: {
    components: {
      Field: InputField,
      Cell,
    },
    condition: (data) => data.type === 'secondary',
  },
}

export default colorPicker
