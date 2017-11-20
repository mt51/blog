import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import { AboutComponent } from './about/about.component';
import { LinkComponent } from './link/link.component';

const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: 'articles', component: ArticleListComponent},
  {path: 'article/:id', component: ArticleComponent},
  {path: 'about', component: AboutComponent},
  {path: 'links', component: LinkComponent},
  {path: '**', component: IndexComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRouterModule {}