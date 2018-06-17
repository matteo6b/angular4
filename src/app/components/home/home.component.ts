import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { VideoService } from '../../services/video.service';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
  public page;
  throttle = 1000;
  scrollDistance = -2;
  public pages;
  public loading: boolean;
  constructor(
    private router:Router,
    private _videoService: VideoService,
    private _userService: UserService,
    private sanitizer: DomSanitizer
  ) {
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
    this.tag = '';
    this.page=1;
  }

  ngOnInit() {
    this.getVideos(this.page);
  }
  getVideos(page) {
    this._videoService.getVideos(page).subscribe(
      response => {
        this.loading = true;
        this.videos = response.videos;
        this.pages = response.pages;
        
      },
      error => {
      }
    );
  }
  onScrollDown() {
    if (this.pages !== this.page) {
      this.loading = false;
      this.page += 1;
      this._videoService.getVideos(this.page).subscribe(response => {
        response.videos.map(r => {
          this.videos.push(r);
        });
        this.loading = true;
      });
    }
  }

  setListTo(tag:string){
    this.router.navigate(['tag',tag])

}
}
