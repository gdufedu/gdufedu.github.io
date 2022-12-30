import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'
import UserList from '../../components/user-list/user-list'
class Dashen extends Component {
  componentDidMount() {
    this.props.getUserList('laoban')
  }
  render() {
    return (
      <UserList userList={this.props.userList}/>
    )
  }
}
export default connect(
  state => ({userList: state.userList}),
  {getUserList}
)(Dashen)
