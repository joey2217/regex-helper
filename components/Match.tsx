import { Card } from 'antd'
import React, { memo } from 'react'

interface Props {
  regex: RegExp
  str: string
}

const Match: React.FC<Props> = ({ regex, str }) => {
  const match = str.match(regex)
  if (match) {
    let index = 0
    const children: React.ReactNode[] = []
    match.forEach((m, _index) => {
      const i = str.indexOf(m, index)
      if (i > index) {
        children.push(
          <span key={index + 'normal'}>{str.substring(index, i)}</span>
        )
        index = i
      }
      const lastIndex = i + m.length
      index = lastIndex
      children.push(
        <span className="text-red-300" key={index}>
          {str.substring(i, lastIndex)}
        </span>
      )
      if (_index === match.length - 1) {
        children.push(<span key="last">{str.substring(lastIndex)}</span>)
      }
    })
    return <Card className="text-base">{children}</Card>
  }
  return <Card>nomatch</Card>
}

export default memo(Match)
