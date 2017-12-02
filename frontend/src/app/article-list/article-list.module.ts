import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleListComponent } from './article-list.component';
import { ArticlesListService } from './article-list.service';
import { ArticleListRouterModule } from './article-list-router.module';

@NgModule({
  declarations: [
    ArticleListComponent
  ],
  imports: [
    ArticleListRouterModule,
    CommonModule
  ],
  providers: [ArticlesListService],
})
export class ArticleListModule { }
