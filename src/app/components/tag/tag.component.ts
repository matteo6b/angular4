import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
  providers: [VideoService]
})
export class TagComponent implements OnInit {
    public tag:string;
    public page:number;
    throttle = 1000;
    scrollDistance = -2;
    public pages;
    public loading: boolean;
    public videos;
    public url:string;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private _videoService: VideoService,
    private sanitizer: DomSanitizer,
  ) { 
    this.page=1
    this.loading=false;
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tag = params['tag'];

      this.findTag();
    });

  }
  findTag(){
        this._videoService.findTag(this.page,this.tag).subscribe(response=>{ this.loading = true;
          this.videos = response.videos;
          this.pages = response.pages;  } )
  }

  onScrollDown() {
    if (this.pages !== this.page) {
      this.loading = false;
      this.page += 1;
      this._videoService.findTag(this.page,this.tag).subscribe(response => {
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
