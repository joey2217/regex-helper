import { Card, Input } from 'antd'
import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import Match from '../components/Match'
import Regex from '../components/Regex'

const LOCAL_INPUT_VALUE = 'local_input_value'

const Home: NextPage = () => {
  const [regex, setRegex] = useState<RegExp>(new RegExp(''))
  const [str, setStr] = useState('')

  const onChange = useCallback((val: RegExp) => {
    setRegex(val)
  }, [])

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    localStorage.setItem(LOCAL_INPUT_VALUE, val)
    setStr(val)
  }

  useEffect(() => {
    setStr(localStorage.getItem(LOCAL_INPUT_VALUE) || '')
  }, [])

  return (
    <div>
      <Regex onChange={onChange} />
      <Card>
        <Input.TextArea value={str} onChange={onInputChange} />
      </Card>
      <Match regex={regex} str={str} />
    </div>
  )
}

export default Home
