import React from 'react'

import { DefaultCellComponentProps } from 'payload/types'
import './styles.scss'

const Cell: React.FC<DefaultCellComponentProps> = (props) => {
  const { cellData } = props

  if (!cellData) return null

  return <div className="chip" style={{ backgroundColor: cellData as string }} />
}

export default Cell
