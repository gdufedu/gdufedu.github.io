import React, {Component} from 'react'
import {TabBar} from 'antd-mobile'
import propTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
const Item = TabBar.Item
class NavFooter extends Component {
  static propTypes = {
    navList: propTypes.array.isRequired,
    unReadCount: propTypes.number.isRequired
  }
  render() {
    let {navList, unReadCount} = this.props
    navList = navList.filter(nav => !nav.hide)
    const path = this.props.location.pathname
    return (
      <TabBar>
        {
          navList.map((nav) => (
            <Item key={nav.path}
              badge={nav.path === '/message' ? unReadCount : 0}
              title={nav.text}
              icon={{uri:require(`./images/${nav.icon}.png`)}}
              selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
              selected={path === nav.path}
              onPress={() => {
                this.props.history.replace(nav.path)
              }}
            ></Item>
          ))
        }
      </TabBar>
    )
  }
}
export default withRouter(NavFooter)
