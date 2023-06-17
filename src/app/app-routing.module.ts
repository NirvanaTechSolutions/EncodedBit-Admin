import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StudentsComponent } from './adminlayout/students/students.component';
import { CreatebatchComponent } from './batchlayout/createbatch/createbatch.component';
import { SendnewsComponent } from './batchlayout/sendnews/sendnews.component';
import { SendscheduleComponent } from './batchlayout/sendschedule/sendschedule.component';
import { SendlinkComponent } from './batchlayout/sendlink/sendlink.component';

const routes: Routes = [
  {
    component:AppComponent,
    path:''
  }
  ,
  {
    component:StudentsComponent,
    path:'students'
  },
  {
    component:CreatebatchComponent,
    path:'createbatch'
  },
  {
    component:SendnewsComponent,
    path:'sendnews'
  },
  {
    component:SendscheduleComponent,
    path:'sendschedule'
  },
  {
    component:SendlinkComponent,
    path:'sendlink'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
