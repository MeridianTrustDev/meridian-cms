import { TextField } from 'node_modules/payload/dist/fields/config/types'

export type Props = Omit<TextField, 'type'> & {
  inputRef?: React.MutableRefObject<HTMLInputElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  path?: string
  icons?: Record<string, string>
  renderSvg?: boolean
}
