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

  articleInfo: object = {}
  constructor(
    private article: ArticleService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    const articleId = this.router.snapshot.params.id
    this.article.fetchArticleDetail(articleId)
      .then(response => {
        if (response.body.code === 0) {
          this.articleInfo = response.body.data
        }
      })
  }

}
