import React, { Component } from 'react'
import { connect } from 'react-redux'

class Footer extends Component<any, object>{
  public render () {
    return (
      <footer className={['layout-footer', 'text-color-minor'].join(' ')} style={{ marginLeft: this.props.sidebarOpen ? '200px' : '80px' }}>
        © 2013-2018 id-bear  <a href="http://www.id-bear.com" target={'_black'}>谷熊科技有限公司</a> 粤 ICP 备 13080041    联系电话:0755-82559229(周一到周五 9:30-18:30)
      </footer>
    )
  }
}

function mapState(state: any){
  return{
    sidebarOpen: state.App.sidebarOpen
  }
}

export default connect(mapState)(Footer)