import { Card, Checkbox, Input } from 'antd'
import React, { memo, useEffect, useState } from 'react'

interface Props {
  onChange: (reg: RegExp) => void
}

export type modifier = 'g' | 'i' | 'm' | 's'

const LOCAL_MODIFIERS = 'local_modifiers'
const LOCAL_REG = 'local_reg'

const options = [
  { label: '全局搜索 - g', value: 'g' },
  { label: '忽略大小写 - i', value: 'i' },
  { label: '多行模式 - m', value: 'm' },
  { label: '包含换行符 - s ', value: 's' },
]

const Regex: React.FC<Props> = ({ onChange }) => {
  const [modifiers, setModifiers] = useState<modifier[]>([])
  const [value, setValue] = useState('[0-9]+')

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    localStorage.setItem(LOCAL_REG, val)
    setValue(val)
  }

  useEffect(() => {
    const reg = new RegExp(value, modifiers.join(''))
    onChange(reg)
  }, [modifiers, onChange, value])

  useEffect(() => {
    const val = localStorage.getItem(LOCAL_MODIFIERS)
    if (val) {
      setModifiers(val.split(',') as modifier[])
    }
    const inputValue = localStorage.getItem(LOCAL_REG)
    if (inputValue) {
      setValue(inputValue)
    }
  }, [])

  return (
    <Card>
      <Input
        allowClear
        addonBefore="/"
        addonAfter={'/' + modifiers.join('')}
        value={value}
        onChange={onInputChange}
      />
      <div className="text-center py-4">
        <Checkbox.Group
          options={options}
          value={modifiers}
          onChange={(checkedValues) => {
            localStorage.setItem(LOCAL_MODIFIERS, checkedValues.join())
            setModifiers(checkedValues as modifier[])
          }}
        />
      </div>
    </Card>
  )
}

export default memo(Regex)
