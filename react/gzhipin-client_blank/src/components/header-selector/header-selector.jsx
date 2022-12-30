import React, {Component} from 'react'
import {
  List,
  Grid
} from 'antd-mobile'
import propTypes from 'prop-types'
export default class HeaderSelector extends Component {
  static propTypes = {
    setHeader: propTypes.func.isRequired
  }
  state = {
    icon: null
  }
  constructor(props) {
    super(props)
    this.headerList = []
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text: '头像' + (i + 1),
        icon: require(`../../assets/images/头像${i+1}.png`)
      })
    }
  }
  handleClick = ({text, icon}) => {
    this.setState({icon})
    this.props.setHeader(text)
  }
  render() {
    const {icon} = this.state
    const listHeader = !icon ? '请选择头像' : (
      <div>
        已选择头像: <img src={icon} alt=""/>
      </div>
    )
    return (
      <List renderHeader={() => listHeader}>
        <Grid data={this.headerList}
        columnNum={5}
        onClick={this.handleClick}></Grid>
      </List>
    )
  }
}
