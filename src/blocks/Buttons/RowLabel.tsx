'use client'

import type { RowLabelComponent } from 'payload/types'

import { useRowLabel } from '@payloadcms/ui/forms/RowLabel/Context'
import React from 'react'

export const ArrayRowLabel: RowLabelComponent = () => {
  const { data } = useRowLabel<{ text: string }>()
  return <div>{data.text || 'Untitled'}</div>
}
