import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User } from '../../models/user';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user:User;
  public status:String;
  constructor(
    private _route :ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
      this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit() {

  }
 onsubmit(registerForm){
    this._userService.register(this.user).subscribe(
      response =>{

        this.user =response.user;
        this.status="success";
        this.user = new User('','','','','','ROLE_USER','');
        registerForm.reset();



      },
      error =>{
        this.status="error";
      }
    )
 }
}
