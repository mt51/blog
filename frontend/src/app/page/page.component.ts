import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor() { }

  pages: number[] = [1,2,3,4,5,6]
  currentPage: number = 1

  ngOnInit() {
  }

}
