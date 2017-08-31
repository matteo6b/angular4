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
  @Input('isActive') isActive: boolean;
  @Input('id') id: String;
  constructor( private _videoService:VideoService) {

  }
  onClick() {
    this.likesCount += (this.isActive) ? -1 : 1;
    this.isActive = !this.isActive;
    if(this.isActive==true){
      console.log(this.id)
      this._videoService.favoriteVideo(this.id).subscribe (
        response =>{response},
      )
    }else{
      this._videoService.unfavoriteVideo(this.id).subscribe (
        response =>{response},
      )

    }
  }
}
