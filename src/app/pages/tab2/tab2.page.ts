import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/news.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  // Attributes
  categories: string[] = [];
  selectedCategory: string = this.categories[0];
  filteredByCategoryNews: Article[] = [];

  constructor(private news: NewsService) {}

  ngOnInit() {
    this.news.getCategories().subscribe((resp) => {
      // When I suscribe I deleted the Observable data type and return only the data
      this.categories = resp;
    });
  }

  // Methods
  segmentChanged(event: any) {
    this.selectedCategory = event.detail.value;
    console.log(event.detail.value); // Get the selected category

    // Request the service
    this.news.getNewByCategory(event.detail.value).subscribe((resp) => {
      this.filteredByCategoryNews = resp;
      console.log(resp);
    });
  }
}
