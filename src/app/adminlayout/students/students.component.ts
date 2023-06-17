import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
students:any
constructor(private main:StudentService){
this.main.getallstudents().then((response)=>{
  this.students = response
})
}



  
}
