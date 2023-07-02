import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './adminlayout/students/students.component';
import { CreatebatchComponent } from './batchlayout/createbatch/createbatch.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SendnewsComponent } from './batchlayout/sendnews/sendnews.component';
import { SendscheduleComponent } from './batchlayout/sendschedule/sendschedule.component';
import { SendlinkComponent } from './batchlayout/sendlink/sendlink.component';
import { LoadingComponent } from './loading/loading.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { HomelayoutComponent } from './homelayout/homelayout.component';
import { DeletebatchComponent } from './batchlayout/deletebatch/deletebatch.component';
import { BatchwiseComponent } from './downloadreports/batchwise/batchwise.component';
import { PlanwiseComponent } from './downloadreports/planwise/planwise.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    CreatebatchComponent,
    SendnewsComponent,
    SendscheduleComponent,
    SendlinkComponent,
    LoadingComponent,
    SidebarComponent,
    MainComponent,
    HomelayoutComponent,
    DeletebatchComponent,
    BatchwiseComponent,
    PlanwiseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule 
    ,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
