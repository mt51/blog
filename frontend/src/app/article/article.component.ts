import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArticleService } from './article.service'

@Component({
  selector: 'app-article',
  providers: [ArticleService],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articleInfo: object = {
    title: ''
  }
  private randomBgClass: string

  constructor(
    private article: ArticleService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.randomBgClass = 'article-title random_' + Math.ceil(Math.random() * 19);
    const articleId = this.router.snapshot.params.id
    this.article.fetchArticleDetail(articleId)
      .then(response => {
        if (response.body.code === 0) {
          this.articleInfo = response.body.data
          console.log(response)
        }
      })
  }

}
