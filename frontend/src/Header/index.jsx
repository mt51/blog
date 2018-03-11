import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import routers from '../router'
import './header.css'

export default class Header extends Component {

  constructor () {
    super()
    this.state = {
      className: 'nav-lists',
      scrollClass: '',
      flag: true
    }
    this.handleNavListVisible = this.handleNavListVisible.bind(this)
  }

  handleNavListVisible (event) {
    this.setState(prevState => {
      let className = ''
      className = prevState.className === 'visible' ? '' : 'visible'
      return {
        className
      }
    })
  }

  componentDidMount () {
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop === 0 ) {
        this.setState({
          scrollClass: '',
          flag: true
        })
      } else if (scrollTop >= 10 && this.state.flag) {
        this.setState({
          scrollClass: 'scroll',
          flag: false
        })
      }
    })
  }

  render () {

    const navConfig = routers.filter(router => router.isNav)
    const { className, scrollClass } = this.state
    return (
      <div className={`header ${scrollClass}`}>
        <div className="avatar">
          <NavLink to="/about">
            <img src="//ofl49b399.bkt.clouddn.com/1.jpg" alt="头像" />
          </NavLink>
        </div>
        <nav>
          <div className={`${className}-line`}></div>
          <div className="nav-bread" onClick={this.handleNavListVisible}>
            <i className="fa fa-navicon"></i>
          </div>
          <ul className={`nav-lists ${className}`}>
            {
             navConfig.map((router, index) => (
              <li className="nav-item" key={index}><NavLink exact={router.path==='/'} activeClassName="navlink-active" to={router.path}>{router.name}</NavLink></li>
             ))
            }
          </ul>
        </nav>
      </div>
    )
  }
}