import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Article } from 'src/app/interfaces/news.interface';
import { NewsService } from 'src/app/services/news.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.component.html',
  styleUrls: ['./infinite.component.scss'],
})
export class InfiniteComponent implements OnInit {

  @Input() selectedCategory:string="";
  @Output() data = new EventEmitter<Article[]>();
  @ViewChild(IonInfiniteScroll) infiniteScroll:IonInfiniteScroll // Create a viewChild to handle the inifinite Scroll

  constructor(private news:NewsService) { }

  ngOnInit() {}

  loadingData(){
    // Request the service
    this.news.getNewByCategory(this.selectedCategory).subscribe(resp => { // cast the event to a custom event
      this.data.emit(resp); // Send the data to the father component
      this.infiniteScroll.complete(); // End the infinite scroll wait time
    });
  }

}
