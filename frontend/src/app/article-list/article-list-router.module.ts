import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleListComponent } from './article-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ArticleListComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ArticleListRouterModule {}