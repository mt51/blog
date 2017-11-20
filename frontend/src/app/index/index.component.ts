import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor() { }

  artilceList: object[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
  ngOnInit() {
  }
}
