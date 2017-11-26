import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticlesListService } from './categories.service';

@Component({
  selector: 'app-categories',
  providers: [ArticlesListService],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

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
    this.activeRouter.params.subscribe(r => {
      const category = r.category
      this.article.fetchArtlclesList({page: this.currentPage}, category)
      .then(response => {
        if (response.body.code === 0) {
          this.flag = true
          this.artilceList = this.artilceList.concat(response.body.data)
          this.total = response.body.total
          this.more = Math.ceil(this.total/10) !== this.currentPage
        }
      })
      .catch(error => {
        console.log(error)
      })
    })
  }
  loadMore () {
    this.currentPage++
    this.fetchArticleData()
    this.flag = false
  }

}
