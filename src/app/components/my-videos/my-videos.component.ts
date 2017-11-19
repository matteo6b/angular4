import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.css'],
    providers: [UserService]
})
export class MyVideosComponent implements OnInit {
  public user;
  public url:string;
  constructor(  private _userService: UserService) {
      this.url=GLOBAL.url;
   }

  ngOnInit() {
      this._userService.getUser().subscribe(response=>{
          this.user=response;

      })
  }

}
