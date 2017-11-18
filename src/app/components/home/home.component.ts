import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../services/global';
import {VideoService} from '../../services/video.service'
import {UserService} from '../../services/user.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [VideoService,UserService]
})
export class HomeComponent implements OnInit {
  public url:string;
  public videos:Array<Object>;
  public identity;
  constructor( private _videoService:VideoService,private _userService:UserService) {
      this.identity=  this._userService.getIdentity();
    this.url=GLOBAL.url
  }

  ngOnInit() {
      this.getVideos();

  }

  getVideos(){

    this._videoService.getVideos().subscribe(
      response =>{
      this.videos=response;


      },
      error =>{

      }
    )


}
onScroll(){


}

}
