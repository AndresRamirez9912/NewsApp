import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/news.interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  articles:Article[]=[]; // Create an Article array

  constructor(private newService: NewsService) {}
  ngOnInit() {
    this.newService.getNews().subscribe((articles) => {
      this.articles=articles; // Assign the data to my variable
    }); // Subscribe and print in console
  }
  scrollData(data:Article[]){
    this.articles.push(...data);
  }
}
