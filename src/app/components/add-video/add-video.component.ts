import { Component, OnInit } from '@angular/core';
import {UploadService} from '../../services/upload.service';
import {GLOBAL} from '../../services/global';
import {VideoService} from '../../services/video.service'
import {UserService} from '../../services/user.service';
import {Video } from '../../models/video';
@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css'],
    providers: [VideoService,UploadService,UserService]
})
export class AddVideoComponent implements OnInit {
  public url:string;
  public token;
  public video ;
  constructor(
    private _videoService: VideoService,
    private _uploadService:UploadService,
    private _userService:UserService
  ) {
    this.video=new Video('','','',new File([""], "video"));
    this.token=_userService.getToken();
    this.url=GLOBAL.url;
  }

  ngOnInit() {

  }
  onsubmit(){


      this._uploadService.makeVideo(this.url+'video/add',this.video,this.token)
      .then((result: any) =>{
      //  this.user.image=result.image;
      //  localStorage.setItem('identity',JSON.stringify(this.user));
      console.log(result);
      })
  }
  fileChangeEvent(fileInput:any){
    this.video.file = fileInput.target.files;
  }

}
