import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UploadService {
  public url: string;
  constructor(private http: Http) {
    this.url = GLOBAL.url;
  }

  makeFileRequest(
    url: string,
    params: Array<string>,
    files: Array<File>,
    token: string,
    name: string
  ) {
    return new Promise(function(resolve, reject) {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      for (let i = 0; i < files.length; i++) {
        formData.append(name, files[i]);
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }
  makeVideo(url: string, video: any, token: string) {
    return new Promise(function(resolve, reject) {
      const formData: any = new FormData();
      const tags = [];
      for (const tag of video.tags) {
        tags.push(tag.value);
      }

      const xhr = new XMLHttpRequest();
      formData.append('title', video.title);
      formData.append('video', video.file[0]);
      formData.append('description', video.description);
      for (const tag of tags) {
        formData.append('tags[]', tag);
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }
}
