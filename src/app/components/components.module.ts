import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';



@NgModule({
  declarations: [
    ArticleComponent,
    ArticleListComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ArticleListComponent,
  ]
})
export class ComponentsModule { }
