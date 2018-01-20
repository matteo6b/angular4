import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from  './global';
import {UserService} from './user.service'
@Injectable()
export class FollowService {
  public url:string;


  constructor(private _http:Http,private userService:UserService) {


    this.url = GLOBAL.url;


  }

  addFollow(follow){
    let params=JSON.stringify(follow);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':this.userService.getToken()
  });
  return this._http.post(this.url+'follow',params,{headers:headers})
                              .map(res => res.json());

  }
  deleteFollow(id){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':this.userService.getToken()
  });
  return this._http.delete(this.url+'follow/'+id,{headers:headers})
                              .map(res => res.json());
  }

}
