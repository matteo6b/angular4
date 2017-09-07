import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {VideoService} from '../../services/video.service'
import {GLOBAL} from '../../services/global';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
    providers: [VideoService]
})
export class VideoComponent implements OnInit {
  @ViewChild('videoPlayer')
   videoPlayer:any;
   duracion:string;
   progreso:number;
   posicion:string;
   url:string;

   videoInfo: any;
   id: string;
  constructor(
      private route: ActivatedRoute,
      private _videoService:VideoService
  ) {
    this.url=GLOBAL.url;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

     this.id = params['id'];

     this.obtenerInfoVideo();
   })
  }
  obtenerInfoVideo(): void {
    this._videoService.getVideo(this.id).subscribe(
      response =>{
        this.videoInfo=response;
      })



 }
    reproducirVideo():void{

      this.videoPlayer.nativeElement.play();
    }


    detenerVideo():void{
      this.videoPlayer.nativeElement.pause();
      this.videoPlayer.nativeElement.currentTime = 0;
    }

    pausarVideo():void{
      this.videoPlayer.nativeElement.pause();
    }

     onMetadata(e, video):void {

        let minutos = Math.floor(video.duration / 60);
        let segundos =  Math.floor(video.duration);

        this.duracion = minutos + ":" + segundos;


     }


     onTimeUpdate(e, video):void{

        this.progreso = Math.floor((video.currentTime/video.duration)*100);


       let minutos = Math.floor(video.currentTime / 60);
       let segundos =  Math.floor(video.currentTime);

      this.posicion = minutos + ":" + segundos;

     }
}
