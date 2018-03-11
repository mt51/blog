import React, { Component } from 'react'
import Banner from '../Banner'
import './about.css'

export default class About extends Component {
  render() {
    return (
      <div className="about">
        <Banner />
        <div className="about-wrapper">
          <h2 className="about-title">关于我</h2>
        <div className="about-item">伪宅的前端汪</div>
        </div>
      </div>
    );
  }
}
