import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import routerConfig from '../../router/config'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'


interface IComponentProp extends RouteComponentProps<any> {
  sidebarOpen: boolean
}

class Aside extends Component<IComponentProp, object>{
  public render () {
    const pathname = this.props.location.pathname
    const subMenu = routerConfig.menus.find((item) => pathname.indexOf(item.path) !== -1)
    const MenuComponent = () => (
      <Menu
        mode="inline"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[subMenu && this.props.sidebarOpen ? subMenu.path : '']}
        theme={'dark'}
        inlineCollapsed={!this.props.sidebarOpen}
      >
        {
          routerConfig.menus.map((item: any) => {
            const ChildrenMenu = ({ childrenItem, ...other }: { childrenItem: any, key: any }) => (
              childrenItem.hidden ? '' : (
                childrenItem.children && childrenItem.children.length > 0 ? (
                  <Menu.SubMenu key={childrenItem.path} title={<span><Icon type="mail" /><span>{childrenItem.meta.title}</span></span>} {...other}>
                    {
                      childrenItem.children.map((menuItem: any) => {
                        return (
                          <Menu.Item key={menuItem.path}>
                            <Link to={menuItem.path}>{menuItem.meta.title}</Link>
                          </Menu.Item>
                        )
                      })
                    }
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item key={item.path} {...other}>
                    <Icon type="mail" />
                    <Link to={item.path}>{item.meta.title}</Link>
                  </Menu.Item>
                )
              )
            )
            return (
              ChildrenMenu({ childrenItem: item, key: item.path })
            )
          })
        }
      </Menu>
    )
    return (
      <aside className={'layout-aside'} style={{ width: this.props.sidebarOpen?'200px':'80px' }}>
        {
          this.props.sidebarOpen ? (
            <div className="layout-aside-logo">
              <img src="/static/imgs/logo.jpg" alt={''} />
              <span>熊小秘AI电商机器人</span>
            </div>
          ) : (
            <div className="layout-aside-logo-small">
              <img src="/static/imgs/logo.jpg" alt={''} />
            </div>
          )
        }
        <div className={'layout-aside-menus'}>
          <MenuComponent />
        </div>
      </aside>
    )
  }
}

function mapState(state: any) {
  return{
    sidebarOpen: state.App.sidebarOpen
  }
}

export default withRouter(connect(mapState)(Aside))