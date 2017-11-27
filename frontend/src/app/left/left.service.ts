import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class LeftService {
  constructor (private http: HttpClient) { }

  fetchCategoriesInfo (): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('//localhost:3000/api/category/info', {observe: 'response'})
        .subscribe(data => {
          resolve(data)
        }, error => {
          reject(error)
        })
    })
  }
}