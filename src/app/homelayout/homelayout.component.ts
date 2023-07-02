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
  hover:any
  showStudents:any
  studentNames: string[] = [];
  constructor(private main:StudentService,private http:HttpClient){
    this.loading=true
  this.main.getallbaches().then((response)=>{
    this.batches = response

    this.loading=false
  
  })
  }

  getStudentNames(batchId: string) {
    const batch = this.batches.find((b:any) => b.batchId === batchId);
    if (batch && batch.studentList) {
      this.fetchStudentNames(batchId);
    } else {
      this.studentNames = [];
    }
  }
  fetchStudentNames(batchId: string) {
    this.http.get<any>(`http://localhost:1020/b/students/batch/${batchId}`).subscribe(
      (response: any) => {
        this.studentNames = response;
        
      },
      (error: any) => {
        console.error('Error fetching student names:', error);
      }
    );
  }

  hideStudentNames() {
    this.studentNames = [];
  }

}
