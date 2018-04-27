import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title: string;
  public identity;
  public url: string;
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.title = 'VmP4';
    this.url = GLOBAL.url;
  }
  ngOnInit() {
    this.identity = this._userService.getIdentity();
  }
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }
  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }
}
