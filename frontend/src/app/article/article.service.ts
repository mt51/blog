import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class ArticleService {
  constructor (private http: HttpClient) {}

  fetchArticleDetail (id: string): Promise <any> {
    return new Promise((resolve, reject) => {
      this.http.get(`//localhost:3000/api/article/${id}`, {observe: 'response'})
      .subscribe(data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}