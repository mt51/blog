import React, { Component } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../config'
import ArticleList from '../Articles/ArticlesList'
import LeftNav from '../LeftNav'
import Banner from '../Banner'
import Pagination from '../Pagination'
import './home.css'

export default class Home extends Component {

  constructor () {
    super()
    this.state = {
      articlesList: [],
      currentPage: 1,
      count: 0
    }
  }

  componentDidMount () {
    const page = this.props.match.params.page || 1
    this.fetchArticleList(page)
  }

  componentWillUpdate (nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const page = nextProps.match.params.page
      this.fetchArticleList(page)
    }
  }

  fetchArticleList (page) {
    axios.get(`${API_BASE_URL}/article?page=${page}`)
      .then(response => {
        if (response.data && response.data.code === 0) {
          const res = response.data
          this.setState({
            articlesList: res.data,
            currentPage: res.page,
            count: res.total
          })
        }
      })
      .catch(e => {
        console.log(e)
      })
  }


  render () {
    const { articlesList, currentPage, count } = this.state
    return (
      <div className="home">
        <Banner />
        <div className="home-wrapper">
          <ArticleList articlesList={articlesList} />
          <LeftNav />
        </div>
        <Pagination page={currentPage} count={count} />
      </div>
    )
  }
}