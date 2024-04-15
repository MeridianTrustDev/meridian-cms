'use client'

import React, { useCallback } from 'react'

import { Props } from './types'
import IconInput from './input'
import { text } from 'payload/fields/validations'
import { useLocale } from '@payloadcms/ui/providers/Locale'
import { useConfig } from '@payloadcms/ui/providers/Config'
import { isFieldRTL } from '@payloadcms/ui/fields/shared'
import { useField } from '@payloadcms/ui/forms/useField'
import { withCondition } from '@payloadcms/ui/forms/withCondition'

const Icon: React.FC<Props> = (props) => {
  const {
    name,
    admin: {
      className,
      components: { Error = null, Label = null, afterInput = null, beforeInput = null } = {},
      condition,
      description,
      placeholder,
      readOnly,
      rtl,
      style,
      width,
    } = {},
    inputRef,
    label,
    localized,
    maxLength,
    minLength,
    path: pathFromProps,
    required,
    validate = text,
    renderSvg,
  } = props

  const path = pathFromProps || name
  const locale = useLocale()

  const { localization } = useConfig()
  const isRTL = isFieldRTL({
    fieldLocalized: localized as boolean,
    fieldRTL: rtl as boolean,
    locale,
    localizationConfig: localization || undefined,
  })

  const memoizedValidate = useCallback(
    (value: unknown, options: any) => {
      return validate(value as string, { ...options, maxLength, minLength, required })
    },
    [validate, minLength, maxLength, required],
  )

  const { errorMessage, setValue, showError, value } = useField<string>({
    path,
    validate: memoizedValidate,
  })

  return (
    <IconInput
      Error={Error || undefined}
      Label={Label || undefined}
      afterInput={afterInput || undefined}
      beforeInput={beforeInput as React.ComponentType<any>[]}
      className={className}
      description={description}
      errorMessage={errorMessage}
      inputRef={inputRef}
      label={label}
      name={name}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      path={path}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      rtl={isRTL}
      showError={showError}
      style={style}
      value={value}
      width={width}
      renderSvg={renderSvg}
    />
  )
}

export default withCondition(Icon)
