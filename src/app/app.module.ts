import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing'
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AdminModule} from './admin/admin.module'
import { AppComponent } from './app.component';
import {LikeComponent} from './components/like/like.component'
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    LikeComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AdminModule,
    InfiniteScrollModule

  ],
  providers: [
    appRoutingProviders
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
