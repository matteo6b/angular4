import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import {VideoService} from '../../services/video.service'
import {UserService} from '../../services/user.service'
@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
    providers: [VideoService,UserService]
})
export class TimelineComponent implements OnInit {

  public url:String
  public title:string;
  public page;
  public total;
  public pages;
  public videos:any[];
  constructor(
    private _route:ActivatedRoute,
    private router:Router,
    private _userService:UserService,
    private _videoService:VideoService,
  ) {
this.url= GLOBAL.url;
this.title="Timeline"
this.page = 1;
this.ngOnInit()
  }

  ngOnInit() {
    this.getTimeLine(this.page);

  }
  getTimeLine(page){
      this._videoService.getTimeLine(page).subscribe(response=>{
          console.log("hola")
        this.videos=response.videos;
        this.pages= response.pages;
        this.total= response.total;
      },
    error =>{

    })

  }

}
