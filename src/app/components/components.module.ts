import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { InfiniteComponent } from './infinite/infinite.component';



@NgModule({
  declarations: [
    ArticleComponent,
    ArticleListComponent,
    InfiniteComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ArticleListComponent,
    InfiniteComponent,
  ]
})
export class ComponentsModule { }
