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

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    CreatebatchComponent,
    SendnewsComponent,
    SendscheduleComponent,
    SendlinkComponent,
    LoadingComponent
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
