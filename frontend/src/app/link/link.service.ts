import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()

export class LinkService {
  constructor (
    private http: HttpClient
  ) {}

  fetchLinkList ():Promise<any> {
    return new Promise ((resolve, reject) => {
      this.http.get('//localhost:3000/api/link', {observe: 'response'})
        .subscribe(data => {
          resolve(data)
        }, error => {
          reject(error)
        })
    })
  }
}