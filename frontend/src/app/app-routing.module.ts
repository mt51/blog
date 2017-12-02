import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import { AboutComponent } from './about/about.component';
import { LinkComponent } from './link/link.component';
import { CategoriesComponent} from './categories/categories.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent,
    loadChildren: 'app/article-list/article-list.module#ArticleListModule'
  },
  {
    path: 'article',
    loadChildren: 'app/article/article.module#ArticleModule'
  },
  {
    path: 'categories',
    component: IndexComponent,
    loadChildren: 'app/categories/categories.module#CategoriesModule'
  },
  // {path: 'article/:id', component: ArticleComponent},
  {path: 'about', component: AboutComponent},
  {path: 'links', component: LinkComponent},
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})

export class AppRouterModule {}