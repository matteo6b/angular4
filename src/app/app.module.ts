import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { LikeComponent } from './components/like/like.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AddVideoComponent } from './components/add-video/add-video.component';
import { MyVideosComponent } from './components/my-videos/my-videos.component';
import { VideoComponent } from './components/video/video.component';
import { AuthGuard } from './services/auth.guard';
import { UserService } from './services/user.service';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { UserComponent } from './components/user/user.component';
import { SnipperComponent } from './components/snipper/snipper.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { TagComponent } from './components/tag/tag.component';
@NgModule({
  declarations: [
    AppComponent,
    LikeComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserEditComponent,
    FavoritesComponent,
    AddVideoComponent,
    MyVideosComponent,
    VideoComponent,
    UsersComponent,
    TimelineComponent,
    UserComponent,
    SnipperComponent,
    TagComponent
  ],
  imports: [
    BrowserModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    AdminModule,
    InfiniteScrollModule,
    NgProgressModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    appRoutingProviders,
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
