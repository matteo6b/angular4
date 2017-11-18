import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import {User } from '../../models/user';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public user:User;
  public token:string;
  public status:string;
  constructor(
    private _route :ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.user = new User('','','','','','','');
  }

  ngOnInit() {
  }
  onsubmit(form){
        this._userService.singup(this.user).subscribe(
          response =>{
              this.token=response.token;
              this.user=response.user;
              this.user.password ="";


              localStorage.setItem('identity',JSON.stringify(this.user))
              localStorage.setItem('token',this.token)
              this._router.navigate(['/home'])
              if(!this.token){
                this.status="error"
              }

          },
          error =>{
            this.status="error";
          }
        )  }
}
