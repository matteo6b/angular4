import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { GLOBAL } from '../../services/global';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { Follow } from '../../models/follow';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [VideoService, UserService, FollowService]
})
export class VideoComponent implements OnInit {
  url: string;
  public identity;
  public following;
  public followUserOver;
  videoInfo: any;
  id: string;
  constructor(
    private route: ActivatedRoute,
    private _videoService: VideoService,
    private _userService: UserService,
    private sanitizer: DomSanitizer,
    private _followService: FollowService
  ) {
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.obtenerInfoVideo();
    });
  }
  obtenerInfoVideo(): void {
    this._videoService.getVideo(this.id).subscribe(response => {
      console.log(response);
      this.videoInfo = response.video;
    });
  }
  onToggleFavorite(video: any, favorited: boolean) {
    this.videoInfo.favorited = favorited;
  }
  mouseEnter(user_id) {
    this.followUserOver = user_id;
  }
  mouseLeave(user_id) {
    this.followUserOver = 0;
  }
  followUser(followed) {
    const follow = new Follow('', this.identity._id, followed);
    this._followService.addFollow(follow).subscribe(
      response => {
        this.following = followed;
      },
      error => {
        console.log(error);
      }
    );
  }
  unFollowUser(followed) {
    this._followService.deleteFollow(followed).subscribe(
      response => {
        this.following = null;
      },
      error => {
        console.log(error);
      }
    );
  }
}
