import React, { Component } from 'react'
import './footer.css'

export default class Footer extends Component {
  render () {
    return (
      <footer className="footer">
        <div className="copyright">
          <a href="http://www.miitbeian.gov.cn/" target="_blank" rel="noopener noreferrer">皖ICP备17027709号</a>
        </div>
      </footer>
    )
  }
}