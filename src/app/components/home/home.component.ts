import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { VideoService } from '../../services/video.service';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [VideoService, UserService]
})
export class HomeComponent implements OnInit {
  public url: string;
  public videos: Array<Object>;
  public identity;
  public tag;
  constructor(
    private _videoService: VideoService,
    private _userService: UserService,
    private sanitizer: DomSanitizer
  ) {
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
    this.tag = '';
  }

  ngOnInit() {
    this.getVideos();
  }
  onToggleFavorite(video: any, favorited: boolean) {
    video.favorited = favorited;
  }

  getVideos() {
    this._videoService.getVideos().subscribe(
      response => {
        this.videos = response;
      },
      error => {}
    );
  }
  onScroll() {}
}
