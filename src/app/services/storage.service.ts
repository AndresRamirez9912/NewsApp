import { Injectable } from '@angular/core';

// Storage
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage :Storage |null = null; //Create a initial null storage
  private _localArticles: Article[]=[]; // Cerate an array of articles

  // Gets
  get getLoadArticles():Article[]{ // Get the
    return [...this._localArticles]
  }

  // Constructor
  constructor(private storage:Storage) {
    this.init();
   }

   // Methods
   async init(){
    const storage = await this.storage.create() // Create an storage
    this._storage=storage;
   }
   async saveRemoveArticle(article:Article){
    // loop the array to search if the input article name its equal to any title inside the arrya
    const exist = this._localArticles.find( localArticle => localArticle.title === article.title);

    // Remove the array
    if(exist){ // If the loop found something means that the user need to remove
      this._localArticles=this._localArticles.filter(localArticle=>localArticle.title !== article.title); //Return All the articles except the article with the name equal to the input article name
    } else{
      this._localArticles=[article, ...this._localArticles]; // Concatenate the articles
    }
      // Save the article in the store
      this._storage.set('articles',this._localArticles) // Save the array in my object key-value
   }

   async loadFavorites(){
     try {
       const articles = await this._storage.get('articles'); // Get the info with the key 'articles'
       this._localArticles=articles || []; // save the data in my array (if return undefine return an empty array)

     } catch (error) {
       // Do nothing
     }
   }
   articleInFavorite(article:Article):boolean{
    return !!(this._localArticles.find(localArticle=>localArticle.title===article.title)); // Return True / false the article aleady exist in the favorite list
  }
}
