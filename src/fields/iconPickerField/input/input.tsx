'use client'

import type { ChangeEvent } from 'react'
import React, { useEffect, useState } from 'react'

import './index.scss'
import { useTranslation } from '@payloadcms/ui/providers/Translation'
import { getTranslation } from '@payloadcms/translations'
import { useDebounce } from '@payloadcms/ui/hooks/useDebounce'

import { FieldError } from '@payloadcms/ui/forms/FieldError'
import { FieldLabel } from '@payloadcms/ui/forms/FieldLabel'
import { fieldBaseClass } from '@payloadcms/ui/fields/shared'
import { FieldDescription } from '@payloadcms/ui/forms/FieldDescription'
import { TextFieldProps } from '@payloadcms/ui/fields/Text'
import { Description } from 'payload/types'

import * as Lucide from 'react-icons/lu'

const baseClass = 'icon'

export type IconInputProps = Omit<TextFieldProps, 'type'> & {
  Error?: React.ComponentType<any>
  Label?: React.ComponentType<any>
  afterInput?: React.ComponentType<any>[]
  beforeInput?: React.ComponentType<any>[]
  className?: string
  description?: Description
  errorMessage?: string
  inputRef?: React.MutableRefObject<HTMLInputElement>
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  path: string
  placeholder?: Record<string, string> | string
  readOnly?: boolean
  required?: boolean
  rtl?: boolean
  showError?: boolean
  style?: React.CSSProperties
  value?: string
  width?: string
  icons?: Record<string, any>
  renderSvg?: boolean
}

const icons = Object.entries(Lucide).reduce(
  (acc, [key, Icon]) =>
    typeof Icon === 'function' && {
      ...acc,
      [key]: Icon,
    },
  {},
)

const IconInput: React.FC<IconInputProps> = ({
  Error,
  Label,
  afterInput,
  beforeInput,
  className,
  description,
  errorMessage,
  inputRef,
  label,
  onChange,
  onKeyDown,
  path,
  placeholder,
  readOnly,
  required,
  rtl,
  showError,
  style,
  value,
  width,
  renderSvg,
}) => {
  const [search, setSearch] = useState('')
  const [filteredIcons, setFilteredIcons] = useState(icons)
  const [hoveredIcon, setHoveredIcon] = useState<null | string>(null)
  const [fieldIsFocused, setFieldIsFocused] = useState(false)

  const { i18n } = useTranslation()
  const debouncedSearch = useDebounce(search, 300)

  const ErrorComp = Error || FieldError
  const LabelComp = Label || FieldLabel

  useEffect(() => {
    if (!icons) return

    if (debouncedSearch == '') {
      setFilteredIcons(icons)
    } else {
      const foundIcons: any = {}
      Object.keys(icons).forEach((icon) => {
        if (icon.toLowerCase().includes(debouncedSearch.toLowerCase())) {
          foundIcons[icon] = icons[icon as keyof typeof icons]
        }
      })
      setFilteredIcons(foundIcons)
    }
  }, [debouncedSearch, icons])

  return (
    <div
      className={[fieldBaseClass, 'icon', className, showError && 'error', readOnly && 'read-only']
        .filter(Boolean)
        .join(' ')}
      style={{
        ...style,
        width,
      }}
    >
      <ErrorComp message={errorMessage as string} showError={showError} />
      <LabelComp htmlFor={`field-${path.replace(/\./g, '__')}`} label={label} required={required} />
      <div
        className={`${baseClass}__input-container`}
        onFocus={() => setFieldIsFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setTimeout(() => setFieldIsFocused(false), 200)
          }
        }}
      >
        {Array.isArray(beforeInput) && beforeInput.map((Component, i) => <Component key={i} />)}
        {!rtl && (
          <div className={`${baseClass}__icon-preview`} onClick={() => setFieldIsFocused(true)}>
            {renderSvg ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: (value && icons && icons[value as keyof typeof icons]) || '',
                }}
              />
            ) : (
              value && icons && (icons[value as keyof typeof icons] as () => JSX.Element)()
            )}
          </div>
        )}
        <input
          data-rtl={rtl}
          disabled={readOnly}
          id={`field-${path.replace(/\./g, '__')}`}
          name={path}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={
            placeholder
              ? getTranslation(placeholder as string, i18n)
              : getTranslation('Select an icon', i18n)
          }
          ref={inputRef}
          type="text"
          value={value || ''}
          spellCheck={false}
        />
        {rtl && (
          <div className={`${baseClass}__icon-preview`} onClick={() => setFieldIsFocused(true)}>
            {renderSvg ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: (value && icons && icons[value as keyof typeof icons]) || '',
                }}
              />
            ) : (
              value && icons && (icons[value as keyof typeof icons] as () => JSX.Element)()
            )}
          </div>
        )}
        {fieldIsFocused && (
          <div
            className={`${baseClass}__icon-picker-modal ${
              rtl ? `${baseClass}__icon-picker-modal--rtl` : ''
            }`}
          >
            <div className={`${baseClass}__icon-picker-modal__pagination-meta-container`}>
              <span>
                Showing{' '}
                {Object.keys(filteredIcons as Record<string, string>).length > 140
                  ? 140
                  : Object.keys(filteredIcons as Record<string, string>).length}{' '}
                icons of {Object.keys(icons as Record<string, string>).length}
              </span>
            </div>
            <div className={`${baseClass}__icon-picker-modal__icon-container`}>
              {Object.keys(filteredIcons as Record<string, string>)
                .slice(0, 140)
                .map((icon, index) => (
                  <div
                    onClick={() => {
                      onChange?.({
                        target: {
                          name: path,
                          value: icon,
                        },
                      } as ChangeEvent<HTMLInputElement>)
                      setFieldIsFocused(false)
                      setFilteredIcons(icons)
                    }}
                    title={icon}
                    onMouseOver={() => setHoveredIcon(icon)}
                    className={`${baseClass}__icon-picker-modal__icon-option ${
                      value == icon ? `${baseClass}__icon-picker-modal__icon-option-active` : ''
                    }`}
                    key={index}
                  >
                    {renderSvg ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: (icon && icons && icons[icon as keyof typeof icons]) || '',
                        }}
                      />
                    ) : (
                      icon && icons && (icons[icon as keyof typeof icons] as () => JSX.Element)()
                    )}
                  </div>
                ))}
              {Object.keys(filteredIcons as Record<string, string>).length == 0 && (
                <span>No icons found</span>
              )}
            </div>
            <div className={`${baseClass}__icon-picker-modal__icon-search`}>
              <input
                type="search"
                className="search_field"
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
                placeholder={hoveredIcon || 'Search icons...'}
                data-rtl={rtl}
              />
            </div>
          </div>
        )}
        {Array.isArray(afterInput) && afterInput.map((Component, i) => <Component key={i} />)}
      </div>
      <FieldDescription
        className={`field-description-${path.replace(/\./g, '__')}`}
        description={description as string}
      />
    </div>
  )
}

export default IconInput
