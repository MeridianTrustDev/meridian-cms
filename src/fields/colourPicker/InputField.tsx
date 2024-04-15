'use client'

import React, { useEffect, useState, useCallback, Fragment } from 'react'

// this is how we'll interface with Payload itself
import { useField } from '@payloadcms/ui/forms/useField'

// retrieve and store the last used colors of your users
import { usePreferences } from '@payloadcms/ui/providers/Preferences'

// re-use Payload's built-in button component
import { Button } from '@payloadcms/ui/elements/Button'

// we'll re-use the built in Label component directly from Payload
import { FieldLabel } from '@payloadcms/ui/forms/FieldLabel'

// we can use existing Payload types easily
import { TextFieldProps } from '@payloadcms/ui/fields/Text'

// Import the SCSS stylesheet
import './styles.scss'
import { validateHexColour } from '.'

const baseClass = 'custom-color-picker'

const preferenceKey = 'color-picker-colors'

const InputField: React.FC<TextFieldProps> = (props) => {
  const { path, label, required } = props

  const { value = '', setValue } = useField({
    path,
    validate: validateHexColour,
  })

  const { getPreference, setPreference } = usePreferences()
  const [colorOptions, setColorOptions] = useState<string[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [colorToAdd, setColorToAdd] = useState('')

  useEffect(() => {
    const mergeColorsFromPreferences = async () => {
      const colorPreferences = await getPreference<string[]>(preferenceKey)
      if (colorPreferences) {
        setColorOptions(colorPreferences)
      }
    }
    mergeColorsFromPreferences()
  }, [getPreference, setColorOptions])

  const handleAddColor = useCallback(() => {
    setIsAdding(false)
    setValue(colorToAdd)

    // prevent adding duplicates
    if (colorOptions.indexOf(colorToAdd) > -1) return

    let newOptions = colorOptions
    newOptions.unshift(colorToAdd)

    // update state with new colors
    setColorOptions(newOptions)
    // store the user color preferences for future use
    setPreference(preferenceKey, newOptions)
  }, [colorOptions, setPreference, colorToAdd, setIsAdding, setValue])

  return (
    <div className={baseClass}>
      <FieldLabel htmlFor={path} label={label} required={required} />
      {isAdding && (
        <div>
          <input
            className={`${baseClass}__input`}
            type="text"
            placeholder="#000000"
            onChange={(e) => setColorToAdd(e.target.value)}
            value={colorToAdd}
          />
          <Button
            className={`${baseClass}__btn`}
            buttonStyle="primary"
            iconPosition="left"
            iconStyle="with-border"
            size="small"
            onClick={handleAddColor}
            disabled={validateHexColour(colorToAdd) !== true}
          >
            Add
          </Button>
          <Button
            className={`${baseClass}__btn`}
            buttonStyle="secondary"
            iconPosition="left"
            iconStyle="with-border"
            size="small"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </Button>
        </div>
      )}
      {!isAdding && (
        <Fragment>
          <ul className={`${baseClass}__colors`}>
            {colorOptions.map((color, i) => (
              <li key={i}>
                <button
                  type="button"
                  key={color}
                  className={`chip ${color === value ? 'chip--selected' : ''} chip--clickable`}
                  style={{ backgroundColor: color }}
                  aria-label={color}
                  onClick={() => setValue(color)}
                />
              </li>
            ))}
          </ul>
          <Button
            className="add-color"
            icon="plus"
            buttonStyle="icon-label"
            iconPosition="left"
            iconStyle="with-border"
            onClick={() => {
              setIsAdding(true)
              setValue('')
            }}
          />
        </Fragment>
      )}
    </div>
  )
}
export default InputField
