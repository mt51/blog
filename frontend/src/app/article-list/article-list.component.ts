import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  constructor() { }

  artilceList: object[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]

  ngOnInit() {
  }

}
