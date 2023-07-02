import { Component,Input } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
students:any
searchQuery: string = '';
@Input() showSidebar: boolean = true;
@Input() amount: boolean = true;
@Input() plan: boolean = true;
@Input() activation: boolean = true;
@Input() expiration: boolean = true;
loading:any
constructor(private main:StudentService){
  this.loading=true
this.main.getallstudents().then((response)=>{
  this.students = response
  this.loading=false
})
}

searchStudents(): void {
  this.main.searchStudents(this.searchQuery)
    .subscribe(
      students => this.students = students,
      error => console.error('Error searching students:', error)
    );
}



  
}
