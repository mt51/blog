import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {

  constructor() { }

  leftVisible: boolean = false

  collaspeLeftBar () {
    this.leftVisible = false
  }

  ngOnInit() {
  }

}
