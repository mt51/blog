import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ArticleModule } from './article/article.module';
import { ArticleListModule } from './article-list/article-list.module';
import { CategoriesModule } from './categories/categories.module';

import { AppRouterModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LeftComponent } from './left/left.component';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './about/about.component';
import { LinkComponent } from './link/link.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftComponent,
    IndexComponent,
    AboutComponent,
    LinkComponent,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouterModule,
    BrowserAnimationsModule,
    ArticleModule,
    ArticleListModule,
    CategoriesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
