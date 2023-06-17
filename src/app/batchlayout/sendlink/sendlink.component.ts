import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-sendlink',
  templateUrl: './sendlink.component.html',
  styleUrls: ['./sendlink.component.css']
})
export class SendlinkComponent {
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
      link: this.link
    };
   // You can replace this with your desired logic or API call

    // Clear the form fields after submission
    this.http.post('http://localhost:1020/b/sendlink', formData).subscribe((response)=>{
    console.log(response)
    this.loading=false
  })
  
  }
}
