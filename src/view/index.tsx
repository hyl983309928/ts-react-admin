import React from 'react'
import Bundle from '../components/Bundle'


export const Store = (props: any) => {
  return (
    <Bundle load={() => import('./user/Store')}>
      {(Component: any) => <Component {...props}/>}
    </Bundle>
  )
}
