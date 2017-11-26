import { Component, OnInit, OnChanges, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnChanges {

  constructor() { }

  @Input() page: number
  @Input() total: number
  pages: number[] = []
  currentPage: number = 1

  ngOnInit() {
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log(changes)
    for (let key in changes) {
      this[key] = changes[key].currentValue
    }
    this.currentPage = this.page - 0
    if (this.total > 0) {
      for (let i = 0; i < Math.ceil(this.total/10); i++) {
        this.pages[i] = i + 1
      }
    }
  }

}
