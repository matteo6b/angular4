import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { VideoComponent } from './components/video/video.component';
import { AddVideoComponent } from './components/add-video/add-video.component';
const appRoutes : Routes = [

{path: '',  redirectTo:'home', pathMatch: 'full'},
{path: 'home', component:HomeComponent},
{path:'login', component:LoginComponent },
{path:'registro', component:RegisterComponent },
{path:'user-edit',component:UserEditComponent},
{path:'video-player/:id',component:VideoComponent},
{path:'add-video',component:AddVideoComponent}

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
