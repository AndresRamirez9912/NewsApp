import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/news.interface';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {

  @Input() articles:Article[]=[]; // Create an input to receive the articles

  constructor() { }

  ngOnInit() {}

}
