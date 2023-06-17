import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-sendnews',
  templateUrl: './sendnews.component.html',
  styleUrls: ['./sendnews.component.css']
})
export class SendnewsComponent {
  batches:any
  selectedBatchId: any;
  latestNews: any;
  loading=false
  constructor(private main:StudentService,private http:HttpClient){
  this.main.getallbaches().then((response)=>{
    this.batches = response
    
  })
  }
  onSubmit() {
    this.loading=true
    const formData = {
      batchId: this.selectedBatchId,
      latestNews: this.latestNews
    };
   // You can replace this with your desired logic or API call

    // Clear the form fields after submission
    this.http.post('http://localhost:1020/b/sendnews', formData).subscribe((response)=>{
    console.log(response)
    this.loading=false
  })
  
  }
}
