import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { LeftService } from './left.service';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  providers: [LeftService],
  styleUrls: ['./left.component.scss'],
  animations: [
    trigger('listState', [
      state('inactive', style({
        height: '0px'
      })),
      state('active', style({
        height: '*'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class LeftComponent implements OnInit {

  constructor(
    private category: LeftService
  ) { }

  private categoryInfo: object []
  private listState: string = 'inactive'
  private active: boolean = false

  @Input() leftVisible: boolean
  @Output() onVisible = new EventEmitter<boolean>();

  collaspeLeftBar () {
    this.onVisible.emit(false)
  }

  ngOnInit() {
    this.category.fetchCategoriesInfo()
      .then(response => {
        if (response.body.code === 0) {
          this.categoryInfo = response.body.data
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  toggleActive () {
    this.listState = this.listState === 'inactive' ? 'active' : 'inactive';
    this.active = !this.active
  }
}
