import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../../services/global';
import {VideoService} from '../../services/video.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [VideoService]
})
export class HomeComponent implements OnInit {
  public url:string;
  public videos:Array<Object>;
    public favorites:Array<Object>;
  constructor( private _videoService:VideoService) {

    this.url=GLOBAL.url
  }

  ngOnInit() {
      this.getVideos();

  }

  getFavorites(){
    this._videoService.getFavorites().subscribe(
      response =>{
        for(let video of response)
          {
            for(let favorite of video.user.favorites){
              if(favorite===video._id){

                video.active=true;
              }
              else{
                video.active=false;
              }
            }

          }

      this.favorites=response;


      },
      error =>{

      }
    )


  }

  getVideos(){

    this._videoService.getVideos().subscribe(
      response =>{
        for(let video of response)
          {
            for(let favorite of video.user.favorites){
              if(favorite==video._id){

                video.active=true;
              }

            }

          }

      this.videos=response;


      },
      error =>{

      }
    )


}
onScroll(){


}

}
