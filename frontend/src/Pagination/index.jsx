import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './pagination.css'

export default class Pagination extends Component {
  render () {
    const { page, count } = this.props
    const pages = Math.ceil(count / 10)
    const Prev = function () {
      const current = page - 1
      return <Link to={`/page/${current}`} className="page-item"><i className="fa fa-chevron-left"></i></Link>
    }

    const Next = function () {
      const current = page + 1
      return <Link to={`/page/${current}`} className="page-item"><i className="fa fa-chevron-right"></i></Link>
    }

    const activeClass = (num) => {
      return num === page ? 'page-item active' : 'page-item'
    }

    const list = () => {
      let lists = []
      const pages = Math.ceil(count / 10)
      for (let i = 1; i <= pages; i++) {
        lists.push(<Link key={i} to={`/page/${i}`} className={activeClass(i)}>{i}</Link>)
      }
      return lists
    }
    return (
      <div className="pagination">
        <p>{page}-- {pages}</p>
        {
          page > 1 ? <Prev /> : ''
        }
        {list(page, count)}
        {
          page < pages ? <Next /> : ''
        }
      </div>
    )
  }
}