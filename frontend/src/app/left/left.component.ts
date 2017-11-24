import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {

  constructor() { }

  @Input() leftVisible: boolean
  @Output() onVisible = new EventEmitter<boolean>();

  collaspeLeftBar () {
    this.onVisible.emit(false)
  }

  ngOnInit() {
  }

}
