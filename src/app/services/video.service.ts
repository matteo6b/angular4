import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from  './global';
import {UserService} from './user.service'

@Injectable()
export class VideoService {
  public url:string;
  constructor(private _http:Http,private userService:UserService) {
    this.url = GLOBAL.url;


  }

getVideos(){
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':this.userService.getToken()
});
  return this._http.get(this.url+'video/all',{headers:headers})
                              .map(res => res.json());

}
getFavorites(){
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':this.userService.getToken()
});
  return this._http.get(this.url+'video/favorites',{headers:headers})
                              .map(res => res.json());

}

favoriteVideo(id){
  let headers = new Headers({
    'Authorization':this.userService.getToken()
});
  return this._http.post(this.url+id+'/favorite',{},{headers:headers})
                              .map(res => res.json());

}
unfavoriteVideo(id){
  let headers = new Headers({
    'Authorization':this.userService.getToken()
});
  return this._http.delete(this.url+id+'/unfavorite',{headers:headers})
                              .map(res => res.json());

}


}
