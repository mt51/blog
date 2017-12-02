import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleComponent } from './article.component';
import { ArticleRouterModule } from './article-router.module';

@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    ArticleRouterModule
  ],
  providers: [],
})
export class ArticleModule { }
