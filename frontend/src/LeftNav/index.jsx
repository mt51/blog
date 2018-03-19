import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './left-nav.css'
import { API_BASE_URL } from '../config'
import moment from 'moment'

export default class LeftNav extends Component {
  constructor () {
    super()
    this.state = {
      category: [],
      tags: [],
      articles: [],
      keyword: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  fetchCategories () {
    axios.get(`${API_BASE_URL}/category/info`)
      .then(response => {
        if (response.data.code === 1) {
          this.setState({
            category: response.data.data
          })
        }
      })
      .catch (e => {
        console.log(e)
      })
  }

  fetchTags () {
    axios.get(`${API_BASE_URL}/category`)
      .then(response => {
        if (response.data.code === 0) {
          this.setState({
            tags: response.data.data.tags
          })
        }
      })
      .catch (e => {
        console.log(e)
      })
  }

  fetchNewArticles () {
    axios.get(`${API_BASE_URL}/article?page=1&size=4`)
      .then(res => {
        if (res.data && res.data.code === 0) {
          const data = res.data.data
          this.setState({
            articles: data
          })
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  formatDate (time) {
    return moment(time).format('YYYY-MM-DD')
  }

  componentDidMount () {
    this.fetchCategories()
    this.fetchTags()
    this.fetchNewArticles()
  }

  handleInputChange (e) {
    this.setState({
      keyword: e.target.value
    })
  }

  render () {
    const { category, tags, articles, keyword } = this.state
    return (
      <div className="left-nav">
        <div className="lt-search">
          <input className="lt-search-box lt-search-item" name="keyword" value={keyword} placeholder="搜索..." onChange={this.handleInputChange}/>
          <button className="lt-search-btn lt-search-item"><Link to={`/search/${keyword}`}><i className="fa fa-search"></i></Link></button>
        </div>
        <div className="lt-item">
          <h3 className="ln-item-title">简介</h3>
          <p className="ln-item-descp">记录工作和学习中一些日常</p>
        </div>
        <div className="lt-item">
          <h3 className="ln-item-title">分类</h3>
          <ul className="ln-list ln-category-list">
            {
              category && category.map((item, index) => (
                <li className="ln-category-item" key={index}>
                  <Link to={`/archive/${item.name}`} >{item.name}</Link>
                  <span className="ln-count">（{item.count}）</span>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="lt-item">
          <h3 className="ln-item-title">最新文章</h3>
          <ul className="ln-list ln-articles-list">
            {
              articles && articles.map((item, index) => (
                <li className="ln-articles-item" key={index}>
                  <Link to={`/article/${item['_id']}`} className="ln-article-link">
                    <div className="ln-article-thumb">
                      <img alt="bg" src={`http:${item.bg}?imageMogr2/thumbnail/80x/blur/1x0/quality/75`} />
                    </div>
                    <div className="ln-article-info">
                      <p className="ln-article-title">{item.title}</p>
                      <p className="ln-article-time">{this.formatDate(item.date)}</p>
                    </div>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="lt-item">
          <h3 className="ln-item-title">标签</h3>
          <div className="ln-list ln-tags-list">
            {
              tags && tags.map((tag, index) => (
              <span className="ln-tag-item" key={index}>{tag.name}</span>
            ))
            }
          </div>
        </div>
      </div>
    )
  }
}
