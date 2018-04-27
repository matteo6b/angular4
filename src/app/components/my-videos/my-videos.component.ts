import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.css'],
  providers: [UserService]
})
export class MyVideosComponent implements OnInit {
  public user;
  public url: string;
  constructor(
    private _userService: UserService,
    private sanitizer: DomSanitizer
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this._userService.getProfile().subscribe(response => {
      this.user = response;
    });
  }
}
