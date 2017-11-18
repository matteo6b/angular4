import { Component, OnInit, Input } from '@angular/core';
import {VideoService} from '../../services/video.service'
@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css'],
  providers: [VideoService]
})
export class LikeComponent {
  @Input('likesCount') likesCount: number;
  @Input('id') id: String;
  constructor( private _videoService:VideoService) {

  }
  onClick() {

      this._videoService.favoriteVideo(this.id).subscribe (
        response =>{
          this.likesCount=response.video.favoritesCount;
        },
      )

    }
    onunFavorite(){

      this._videoService.unfavoriteVideo(this.id).subscribe (
        response =>{this.likesCount=response.video.favoritesCount;},
      )
    }

}
