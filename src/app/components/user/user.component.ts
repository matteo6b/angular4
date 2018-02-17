import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
    providers: [UserService]
})
export class UserComponent implements OnInit {
public id: string;
public user;
public url:string;
constructor(
    private route: ActivatedRoute,
    private _userService: UserService
) {
  this.url=GLOBAL.url;
}

  ngOnInit() {

    this.route.params.subscribe(params => {

     this.id = params['id'];

     this.profile();
   })
  }

  profile(){
    this._userService.getUser(this.id).subscribe(response=>{
        this.user=response;
          console.log(this.user);
    })

  }

}
