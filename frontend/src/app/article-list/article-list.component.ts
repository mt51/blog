import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private router: ActivatedRoute
  ) { }

  artilceList: object[] = []

  ngOnInit() {
    const page = this.router.snapshot.params.page || 1
    this.article.fetchArtlclesList({page: page})
      .then(response => {
        if (response.body.code === 0) {
          this.artilceList = response.body.data
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

}
