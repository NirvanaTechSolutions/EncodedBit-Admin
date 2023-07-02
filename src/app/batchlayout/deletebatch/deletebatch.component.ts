import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-deletebatch',
  templateUrl: './deletebatch.component.html',
  styleUrls: ['./deletebatch.component.css']
})
export class DeletebatchComponent {

  batches:any
  selectedBatchId: any;
  link: any;
  loading=false
  constructor(private main:StudentService,private http:HttpClient){
  this.main.getallbaches().then((response)=>{
    this.batches = response
    
  })
  }
  onSubmit() {
    this.loading= true
    const formData = {
      batchId: this.selectedBatchId,
     
    };
   // You can replace this with your desired logic or API call

    // Clear the form fields after submission
    this.http.post('http://localhost:1020/b/deletebatch', formData).subscribe((response)=>{
 
    this.loading=false
  })
  
  }
}
