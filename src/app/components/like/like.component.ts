import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';
@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css'],
  providers: [VideoService]
})
export class LikeComponent {
  @Input('likesCount') likesCount: number;
  @Input('video') video: Video;
  @Output() toggle = new EventEmitter<boolean>();
  constructor(private _videoService: VideoService) {}
  onClick() {
    this._videoService.favoriteVideo(this.video._id).subscribe(response => {
      this.toggle.emit(true);
      this.likesCount = response.video.favoritesCount;
    });
  }
  onunFavorite() {
    this._videoService.unfavoriteVideo(this.video._id).subscribe(response => {
      this.toggle.emit(false);
      this.likesCount = response.video.favoritesCount;
    });
  }
}
