import React, { Component } from 'react'
import axios from 'axios'
import LeftNav from '../../LeftNav'
import '../../assets/markdown.css'
import '../../assets/github.css'
import './article-detail.css'
import { API_BASE_URL } from '../../config'

export default class ArticleDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articleDetail: ''
    }
  }

  fetchArticleDetail (id) {
    axios.get(`${API_BASE_URL}/article/${id}`)
      .then(response => {
        if (response.data && response.data.code === 0) {
          this.setState({
            articleDetail: response.data.data
          })
        }
      })
  }

  componentDidMount () {
    const articleId = this.props.match.params.id
    this.fetchArticleDetail(articleId)
  }

  componentWillUpdate (nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const articleId = nextProps.match.params.id
      this.fetchArticleDetail(articleId)
    }
  }

  render() {
    const { articleDetail } = this.state
    const html = {__html: articleDetail.htmlcont}
    return (
     <div className="article-detail">
      <div className="ad-wrapper">
        <img className="ad-pic" src={'http:' + articleDetail.bg} alt="bg" />
        <div className="markdown-body" dangerouslySetInnerHTML={html}></div>
      </div>
      <LeftNav />
     </div>
    );
  }
}
