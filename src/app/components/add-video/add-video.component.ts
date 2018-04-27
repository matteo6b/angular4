import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';
import { VideoService } from '../../services/video.service';
import { UserService } from '../../services/user.service';
import { Video } from '../../models/video';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css'],
  providers: [VideoService, UploadService, UserService]
})
export class AddVideoComponent implements OnInit {
  public url: string;
  public token: string;
  public video: Video;
  public status: string;
  public urlVideo;
  window = window.URL;
  constructor(
    private _videoService: VideoService,
    private _uploadService: UploadService,
    private _router: Router,
    private _userService: UserService,
    private ngProgress: NgProgress,
    private sanitizer: DomSanitizer
  ) {
    this.video = new Video('', '', '', new File([''], 'video'), []);
    this.token = _userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {}
  onsubmit() {
    this.ngProgress.start();
    console.log(this.video.tags);
    this._uploadService
      .makeVideo(this.url + 'video/add', this.video, this.token)
      .then(
        (result: any) => {
          this.ngProgress.done();
          this._router.navigate(['/home']);
        },
        error => {
          this.status = 'error';
        }
      );
  }
  fileChangeEvent(fileInput: any) {
    this.video.file = fileInput.target.files;

    this.urlVideo = window.URL.createObjectURL(this.video.file[0]);
  }
}
