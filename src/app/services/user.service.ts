import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from  './global';

@Injectable()
export class UserService {
  public url:string;
  constructor(private _http:Http) {
    this.url = GLOBAL.url;


  }
register(userRegister){
    let params= JSON.stringify(userRegister);
    let headers = new Headers({'Content-Type':'application/json'});
    return this._http.post(this.url+'register',params,{headers:headers})
                                .map(res => res.json());
}
singup(userLogin){
    let params= JSON.stringify(userLogin);
    let headers = new Headers({'Content-Type':'application/json'});
    return this._http.post(this.url+'login',params,{headers:headers})
                                .map(res => res.json());
}
updateUser(userUpdate){
  let params= JSON.stringify(userUpdate);
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':this.getToken()
});
  return this._http.put(this.url+'update-user/'+userUpdate._id,params,{headers:headers})
                              .map(res => res.json());

}
getUser(){
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':this.getToken()
});
return this._http.get(this.url+'user/',{headers:headers})
                            .map(res => res.json());

}
getIdentity(){
  let identity= JSON.parse(localStorage.getItem('identity'));
  return identity
}
getToken(){
  let token = localStorage.getItem('token');
  return token;
}

}
