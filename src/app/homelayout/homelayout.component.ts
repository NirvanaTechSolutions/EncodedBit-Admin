import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homelayout',
  templateUrl: './homelayout.component.html',
  styleUrls: ['./homelayout.component.css']
})
export class HomelayoutComponent {

  batches:any
  count:any
  loading:any
  stcount:any
  constructor(private main:StudentService,private http:HttpClient){
    this.loading=true
  this.main.getallbaches().then((response)=>{
    this.batches = response

    this.loading=false
  
  })
  }

}
