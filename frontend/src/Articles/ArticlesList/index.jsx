import React, { Component } from 'react'
import ArticlesListItem from '../ArticlesListItem'
import './article-list.css'

export default class ArticlesList extends Component {

  render() {
    const { articlesList } = this.props
    return (
     <div className="articles-list-container">
      <ul className="articles-list">
        {
          articlesList && articlesList.map(item => (
            <ArticlesListItem key={item['_id']} articlesItem={item} />
          ))
        }
      </ul>
     </div>
    );
  }
}
