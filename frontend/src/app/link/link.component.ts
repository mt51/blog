import { Component, OnInit } from '@angular/core';
import { LinkService } from './link.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  providers: [LinkService]
})
export class LinkComponent implements OnInit{

  constructor(
    private link: LinkService
  ) { }

  linksList: object[]
  ngOnInit() {
    this.link.fetchLinkList()
      .then(response => {
        this.linksList = response.body.data
      })
      .catch(error => {
        console.log(error)
      })
  }

  formatAvatar (item) {
    return item.avatar || '//ofl49b399.bkt.clouddn.com/1.jpg'
  }
}
