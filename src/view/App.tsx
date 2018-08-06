import React from 'react'
import Aside from '../components/layout/Aside'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Main from '../components/layout/Main'

export default class App extends React.Component {
  public render () {
    return (
      <div>
        <Aside />
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}