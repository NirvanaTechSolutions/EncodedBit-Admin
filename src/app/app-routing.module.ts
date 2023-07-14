import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StudentsComponent } from './adminlayout/students/students.component';
import { CreatebatchComponent } from './batchlayout/createbatch/createbatch.component';
import { SendnewsComponent } from './batchlayout/sendnews/sendnews.component';
import { SendscheduleComponent } from './batchlayout/sendschedule/sendschedule.component';
import { SendlinkComponent } from './batchlayout/sendlink/sendlink.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { DeletebatchComponent } from './batchlayout/deletebatch/deletebatch.component';
import { BatchwiseComponent } from './downloadreports/batchwise/batchwise.component';
import { PlanwiseComponent } from './downloadreports/planwise/planwise.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { UpdatebatchComponent } from './batchlayout/updatebatch/updatebatch.component';

const routes: Routes = [
  {
    component:MainComponent,
    path:''
  }
  ,{
    component:ReviewsComponent,
    path:'showreview'
  }
  ,
  {
    component:DeletebatchComponent,
    path:'deletebatch'
  },
  {
    component:BatchwiseComponent,
    path:'dbatchwise'
  },
  {
    component:PlanwiseComponent,
    path:'dplanwise'
  },
  {
    component:StudentsComponent,
    path:'allstudents'
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
  },
  {
    component:UpdatebatchComponent,
    path:'updatebatch'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
