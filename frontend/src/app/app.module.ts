import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LeftComponent } from './left/left.component';
import { IndexComponent } from './index/index.component';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AboutComponent } from './about/about.component';
import { LinkComponent } from './link/link.component';

import { AppRouterModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftComponent,
    IndexComponent,
    ArticleComponent,
    ArticleListComponent,
    AboutComponent,
    LinkComponent,
    HeaderComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
