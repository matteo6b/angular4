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


   }

  ngOnInit() {
    this.actualPage();
  }
  actualPage(){
    this._route.params.subscribe(params =>{
      let page = +params['page'];
      this.page=page;
      if(!params['page']){
        page=1;
      }
      if(!page){
        page=1
      }
      else{
        this.nextPage = page+1;
        this.prevPage = page-1;
        if(this.prevPage <=0){
          this.prevPage = 1;
        }
      }
        this.getUsers(page)
    })
  }
  getUsers(page){

    this._userService.getUsers(page).subscribe(
      response =>{
        this.total=response.total;
        this.pages=response.pages;
        this.users=response.users;
        this.follows=response.usersFollowing;

      },
      error =>{
          this._router.navigate(['/users',1])

        console.log(error);
      }
    )

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
