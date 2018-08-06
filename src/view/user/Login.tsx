import React, { Component } from 'react'
import styleLogin from './login.scss'
import API from '../../api/api'
import PropTypes from 'prop-types'
import BasicError from '../../components/BasicError'
import { Form, Icon, Input, Button } from 'antd'
import { updateToken } from '../../redux/action/index'
const FormItem = Form.Item


class Login extends Component<any, any>{
  public static contextTypes = {
    store: PropTypes.object
  }

  public state = {
    btnLoading: false,
    errorInfo: {
      visible: false,
      errorMsg: '登录失败，请检查用户名密码'
    }
  }

  public handleLogin = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, value: any) => {
      if (!err) {
        this.setState({ btnLoading: true })
        API.user.login(value.userName, value.password)
          .then((res: any) => {
            this.setState({ btnLoading: false })
            this.context.store.dispatch(updateToken(res.token))
            this.props.history.push('/')
          })
          .catch(() => {
            this.setState({ btnLoading: false })
            this.setState({ errorInfo: { ...this.state.errorInfo, visible: true }})
          })
      }
    })
  }
  public render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <header className={styleLogin["page-header"]}>
          <div className={styleLogin["header-logo"]}>
            <span>熊小秘智能店小二</span>
          </div>
          <div className={styleLogin["header-user"]}>
            <Button type="primary">登入</Button>
          </div>
        </header>
        <div className={styleLogin['content-dialog']}>
          <div className={styleLogin["login-box"]}>
            <div className="text-color-primary">登录</div>
            <Form onSubmit={this.handleLogin}>
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [
                    { required: true, message: '请填写用户名' },
                    { pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '请输入正确的手机号' }
                  ],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" onChange={ () => { this.setState({ errorInfo: { ...this.state.errorInfo, visible: false }}) } } />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" type="password" onChange={ () => { this.setState({ errorInfo: { ...this.state.errorInfo, visible: false }}) } } />
                )}
              </FormItem>
              <FormItem style={{position: 'relative'}}>
                <Button loading={this.state.btnLoading} type="primary" htmlType="submit" className={styleLogin["login-btn"]}>
                  登入
                </Button>
                <BasicError show={this.state.errorInfo.visible} errorMsg={this.state.errorInfo.errorMsg} />
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}


export default Form.create()(Login)