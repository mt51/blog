import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import lang from 'moment/locale/zh-cn'
import './article-list-item.css'

moment().locale('zh-cn', lang)

export default class ArticlesListItem extends Component {
  formatDate (format, time) {
    return moment(time).format(format)
  }

  render() {
    const { articlesItem } = this.props
    const BASE_URL = `url(http:${articlesItem.bg}?imageMogr2/thumbnail/700x/blur/1x0/quality/75)`
    const divStyle = {
      backgroundImage: BASE_URL,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
    return (
     <li className="article-item-container" key={articlesItem['_id']}>
        <div className="article-item">
          <Link to={`article/${articlesItem['_id']}`}>
            <div className="article-pic" style={divStyle}>
              <div className="article-time">
                <span className="time-day">{this.formatDate('D', this.props.articlesItem.date)}</span>
                <span className="time-month">{this.formatDate('Mo', this.props.articlesItem.date)}</span>
              </div>
            </div>
          </Link>
          <div className="article-content">
            <h3 className="article-title">
              <Link to={`/article/${articlesItem['_id']}`}>{this.props.articlesItem.title}</Link>
            </h3>
            <p className="article-author"><span className="author-by">by</span>胖先生</p>
            <div className="article-descp"><Link to={`/article/${articlesItem['_id']}`}>{articlesItem.description}</Link></div>
            <p className="article-category"><i className="fa fa-tag"></i><Link to={`/category/${articlesItem.category}`} className="article-category-text">
            {articlesItem.category}</Link></p>
          </div>
        </div>
      </li>
    );
  }
}
