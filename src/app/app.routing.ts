import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { VideoComponent } from './components/video/video.component';
import { AddVideoComponent } from './components/add-video/add-video.component';
import { MyVideosComponent } from './components/my-videos/my-videos.component';
import { UsersComponent } from './components/users/users.component';
import {AuthGuard} from './services/auth.guard';
const appRoutes : Routes = [

{path: '',  redirectTo:'home', pathMatch: 'full',canActivate:[AuthGuard]},
{path: '',  redirectTo:'login', pathMatch: 'full'},
{path: 'home', component:HomeComponent,canActivate:[AuthGuard]},
{path:'login', component:LoginComponent },
{path:'registro', component:RegisterComponent },
{path:'user-edit',component:UserEditComponent,canActivate:[AuthGuard]},
{path:'video-player/:id',component:VideoComponent,canActivate:[AuthGuard]},
{path:'add-video',component:AddVideoComponent,canActivate:[AuthGuard]},
{path:'my-videos',component:MyVideosComponent,canActivate:[AuthGuard]},
{path:'users',component:UsersComponent,canActivate:[AuthGuard]},
{path:'users/:page',component:UsersComponent,canActivate:[AuthGuard]},
{path:'**',component:HomeComponent,canActivate:[AuthGuard]},
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
