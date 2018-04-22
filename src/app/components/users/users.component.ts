import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {FollowService} from '../../services/follow.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Follow} from '../../models/follow';
import {User } from '../../models/user';
import {GLOBAL} from '../../services/global';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[UserService,FollowService],
})
export class UsersComponent implements OnInit {
  public identity;
  public title:string;
  public token;
  public url;
  public page;
  public total;
  public users:User[];
  public pages;
  public follows;
  public nextPage;
  public prevPage;
  throttle = 1000;
scrollDistance = -2;
public loading:boolean;

  constructor(
  private _route :ActivatedRoute,
  private _router: Router,
  private _userService: UserService,
  private _followService:FollowService
) {
    this.title="People";
  this.identity=_userService.getIdentity();
  this.token=_userService.getToken();
  this.url=GLOBAL.url;
  this.page=1;
  this.loading=false


   }

  ngOnInit() {
    this._userService.getUsers(this.page).subscribe(
      response =>{

        this.pages=response.pages;
        this.users=response.users;
        this.follows=response.usersFollowing;

      },
      error =>{

        console.log(error);
      }
    )
  }
  onScrollDown(ev) {
    if(this.pages!=this.page){


    this.page+=1;
    console.log('scrolled down!!', ev);
    this._userService.getUsers(this.page).subscribe(response=>{
      response.users.map(r=>{
      this.users.push(r);


    })
    response.usersFollowing.map(f=>{
      this.follows.push(f)
    })
this.loading=true;


  })
}
  }
  onUp(){
    this.page=-1;
  }




  public followUserOver
  mouseEnter(user_id){
    this.followUserOver=user_id;
  }
  mouseLeave(user_id){
    this.followUserOver=0;
  }
  followUser(followed){
    let follow = new Follow('',this.identity._id,followed)
    this._followService.addFollow(follow).subscribe(response =>{
      this.follows.push(followed);

    },error =>{
        console.log(error)
    })
  }
  unFollowUser(followed){
    this._followService.deleteFollow(followed).subscribe(response =>{
      var search=this.follows.indexOf(followed);

      if(search!=1){

        this.follows.splice(search,1);
      }
    },error =>{
      console.log(error);
    })

  }

}
