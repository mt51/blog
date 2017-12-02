import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':category',
        component: CategoriesComponent
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

export class CategoriesRouterModule {}