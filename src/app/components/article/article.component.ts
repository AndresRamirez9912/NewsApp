import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/news.interface';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from '../../services/storage.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article:Article; // Create an input to receive the articles

  constructor(
    // Plugins
    private iab:InAppBrowser,
    private platform:Platform,
    private socialSharing:SocialSharing,

    // Ionic Components
    private actionsheetCTR:ActionSheetController,

    // Services
    private storageService:StorageService,

    ) { } // Inject the InAppBrowser

  ngOnInit() {}

  openArticle(){ // When I clicked the image or title, open article in the browser
    if(this.platform.is("ios") || this.platform.is('android')){
      const browser = this.iab.create(this.article.url); // Open the url in the native browser
      browser.show(); // Show in the browser
      return;
    }
    window.open(this.article.url,'blank')
  }
  async openMenu(){ // When I clicked on the 3 dots open my actionSheet menu
    // Local Variables
    const exist:boolean=this.storageService.articleInFavorite(this.article); // Get if the article already exist in the favorite list

    // Normal Buttons
    const normalButtons : ActionSheetButton[]=[
      {
        text: exist? 'Remove Favorite' : "Favorite",
        icon: exist? "heart" : "heart-outline",
        handler: ()=>this.onToggleFavorite()
      },
      {
        text: "Cancel",
        icon: 'close-outline',
        role: 'cancel'
      }
    ]

    // Optional Buttons
    const share ={ // Create a button
      text: "Share",
      icon: "share-outline",
      handler: ()=>this.onShareArticle() // Function that execute when I click on this button
    };

    // Add the optional buttons when is necessary
    if(this.platform.is('capacitor')){
      normalButtons.unshift(share); // Add the share button at the top of the normal buttons list
    }

    const actionsheet=await this.actionsheetCTR.create({
      header: "Options",
      buttons: normalButtons // Add the list of buttons
    });

    await actionsheet.present() // Show the actionsheet in the app
  }
  onShareArticle(){ // When I clicked on the share button
    this.socialSharing.share(
      this.article.title,
      this.article.source.name,
      null,
      this.article.url
    );

  }
  onToggleFavorite(){// When I clicked on the favorite button
    console.log("Toggle Favorite");
    this.storageService.saveRemoveArticle(this.article); // Save the article
  }
}
