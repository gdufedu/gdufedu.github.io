import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {
  NavBar,
  InputItem,
  Button,
  TextareaItem
} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'
class DashenInfo extends Component {
  state = {
    header: '',
    post: '',
    info: ''
  }
  setHeader = (header) => {
    this.setState({
      header
    })
  }
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }
  save = () => {
    this.props.updateUser(this.state)
  }
  render() {
    const {header, type} = this.props.user
    if (header) {
      const path = type === 'dashen' ? '/dashen' : '/laoban'
      return <Redirect to={path}/>
    }
    return (
      <div>
        <NavBar>大神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <InputItem placeholder='请输入求职岗位' onChange={val => {this.handleChange('post', val)}}>求职岗位:</InputItem>
        <TextareaItem title='个人介绍:' placeholder='请输入个人介绍' rows={3} onChange={val => {this.handleChange('info', val)}}/>
        <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
  }
}
export default connect(
  state => ({user:state.user}),
  {updateUser}
)(DashenInfo)
