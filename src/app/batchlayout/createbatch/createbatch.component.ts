import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  students:any
  loading= false
constructor(private main:StudentService,private http:HttpClient){
this.main.getallstudents().then((response)=>{
  this.students = response
})
}


onSubmit() {
  this.loading=true
  const studentIds: string[] = this.studentIdList.split(',').map((id:any) => id.trim());

  const formData = {
    batchId: this.batchId,
    studentIds: studentIds
  };
  console.log(formData)
  this.http.post('http://localhost:1020/b/createbatch', formData).subscribe((response)=>{
    console.log(response)
    this.loading=false
  })
}
}


