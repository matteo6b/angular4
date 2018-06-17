import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FollowService } from '../../services/follow.service';
import { Follow } from '../../models/follow';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, FollowService]
})
export class UserComponent implements OnInit {
  public id: string;
  public user;
  public url: string;
  public identity;
  public following;
  public followUserOver;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
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

      this.profile();
    });
  }

  profile() {
    this._userService.getUser(this.id).subscribe(response => {
      this.following = response.following;
      this.user = response;
    });
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

  setListTo(tag:string){
    this.router.navigate(['tag',tag])

}
}
