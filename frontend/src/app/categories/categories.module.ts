import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesComponent } from './categories.component';
import { ArticlesListService } from './categories.service';
import { CategoriesRouterModule } from './categories-routing.module';

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CategoriesRouterModule,
    CommonModule
  ],
  providers: [ArticlesListService],
})
export class CategoriesModule { }
