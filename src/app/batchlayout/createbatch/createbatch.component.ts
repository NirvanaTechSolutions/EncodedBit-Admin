import { HttpClient } from '@angular/common/http';
import { Component,OnChanges } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { io, Socket } from 'socket.io-client';
interface Student {
  id: number;
  name: string;
  plan:string 
}

@Component({
  selector: 'app-createbatch',
  templateUrl: './createbatch.component.html',
  styleUrls: ['./createbatch.component.css']
})
export class CreatebatchComponent {
  batchId: any;
  studentIdList: any;
  public students: any[] = [];
  searchQuery: string = '';

  loading:any
  socket:any
  constructor(private main:StudentService,private http:HttpClient){
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

  selectedUsersubs: string[] = [];
happy:any
unhappy:any
onSubmit() {

 
  this.loading=true
  const selectedUsers = this.students.filter((get: any) => get.selected && get.batchId !== this.batchId);
  this.selectedUsersubs = this.students
  .filter((get:any) => get.selected)
  .map((get:any) => get.usersub);

  const formData = {
    batchId: this.batchId,
    studentIds: this.selectedUsersubs
  };

  console.log(formData)
this.http.post('http://localhost:1020/b/createbatch', formData).subscribe(
  (response) => {
    console.log(response);
    this.students = this.students.filter((get: any) => !get.selected);
    this.loading = false;
    this.happy = true;
    setTimeout(() => {
      this.happy = false;
    }, 3000);
  },
  (error) => {
    this.loading =false
    this.unhappy = true
    setTimeout(() => {
      this.unhappy = false
      
    }, 3000);
  // Log the error message
    // Handle the error as needed
  }
);
}



}


