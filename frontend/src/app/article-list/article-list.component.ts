import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticlesListService } from './article-list.service';


@Component({
  selector: 'app-article-list',
  providers: [ArticlesListService],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  constructor(
    private article: ArticlesListService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) { }

  artilceList: object[] = []
  currentPage: number = 1
  total: number = 0
  flag: boolean = true
  more: boolean = true

  ngOnInit() {
    this.fetchArticleData();
  }
  fetchArticleData () {
    if (!this.flag) return
    this.article.fetchArtlclesList({page: this.currentPage})
    .then(response => {
      if (response.body.code === 0) {
        response.body.data.forEach((item:any) => {
          item.randomBgClass = this.randomBgClass();
        })
        this.flag = true
        this.artilceList = this.artilceList.concat(response.body.data)
        this.total = response.body.total
        this.more = Math.ceil(this.total/10) !== this.currentPage
      }
    })
    .catch(error => {
      console.log(error)
    })
  }
  randomBgClass () {
    return 'item-title random_' + Math.ceil(Math.random() * 19);
  }
  loadMore () {
    this.currentPage++
    this.fetchArticleData()
    this.flag = false
  }
}
