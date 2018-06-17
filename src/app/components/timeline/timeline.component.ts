import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { VideoService } from '../../services/video.service';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: [VideoService, UserService]
})
export class TimelineComponent implements OnInit {
  public url: String;
  public title: string;
  public page;
  public total;
  public pages;
  public videos: any[];
  throttle = 1000;
  scrollDistance = -2;
  public loading: boolean;
  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private _userService: UserService,
    private _videoService: VideoService,
    private sanitizer: DomSanitizer
  ) {
    this.url = GLOBAL.url;
    this.title = 'Timeline';
    this.page = 1;
    this.loading = false;
  }

  ngOnInit() {
    this.getTimeLine(this.page);
  }
  getTimeLine(page) {
    this._videoService.getTimeLine(page).subscribe(
      response => {
        this.loading = true;
        this.videos = response.videos;
        this.pages = response.pages;
        this.total = response.total;
      },
      error => {}
    );
  }
  onScrollDown() {
    if (this.pages !== this.page) {
      this.loading = false;
      this.page += 1;
      console.log('scrolled down!!');
      this._videoService.getTimeLine(this.page).subscribe(response => {
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
