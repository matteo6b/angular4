import {NgModule} from '@angular/core';
import {CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AdminRoutingModule } from './admin-routing.module';

import {MainComponent} from './components/main/main.component';
import {ListComponent} from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import {AdminGuard} from '../services/admin.guard';


@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    AddComponent,
    EditComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    HttpModule,
    AdminRoutingModule
  ],
  exports:[
    MainComponent,
    ListComponent,
    AddComponent,
    EditComponent
  ],
  providers:[
    AdminGuard
  ]
})
export class AdminModule {}
