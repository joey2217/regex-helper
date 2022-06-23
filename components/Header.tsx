import React, { memo } from 'react'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useRouter } from 'next/router'

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: '/',
  },
]

const Header: React.FC = () => {
  const route = useRouter()
  return (
    <header className="flex items-center">
      <div>LOGO</div>
      <Menu
        className="flex-1"
        defaultSelectedKeys={[route.pathname]}
        mode="horizontal"
        items={items}
      />
    </header>
  )
}

export default memo(Header)
