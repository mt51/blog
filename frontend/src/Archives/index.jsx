import React, { Component } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../config'
import ArticleList from '../Articles/ArticlesList'
import LeftNav from '../LeftNav'
import Banner from '../Banner'
import './archives.css'

export default class Archives extends Component {
  constructor () {
    super()
    this.state = {
      articlesList: [],
      isSearch: false
    }
  }

  fetchArticleList (type, keyword) {
    let url
    if (type) {
      url = `${API_BASE_URL}/archives/${type}`
    } else if (!keyword) {
      url = `${API_BASE_URL}/archives?page=1`
    } else {
      url = `${API_BASE_URL}/search?keyword=${keyword}`
      this.setState({
        isSearch: true
      })
    }
    axios.get(url)
      .then(res => {
        if (res.data && res.data.code === 0) {
          const data = res.data.data
          this.setState({
            articlesList: data
          })
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  componentDidMount () {
    const type = this.props.match.params.type
    const keyword = this.props.match.params.keyword
    this.fetchArticleList(type, keyword)
  }

  componentWillUpdate (nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const type = nextProps.match.params.type
      const keyword = nextProps.match.params.keyword
      this.fetchArticleList(type, keyword)
    }
  }

  render () {
    const { articlesList, isSearch } = this.state
    return (
      <div className="archives">
        {
          isSearch ? <Banner /> : ''
        }
        <div className="archives-container">
          {
            isSearch && articlesList ? <p className="empty">抱歉，您要的内容似乎没有哦，不如换个关键字试试吧。</p> : <ArticleList articlesList={articlesList} />
          }
        <LeftNav />
        </div>
      </div>
    )
  }
}