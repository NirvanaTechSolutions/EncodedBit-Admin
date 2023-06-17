import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-sendschedule',
  templateUrl: './sendschedule.component.html',
  styleUrls: ['./sendschedule.component.css']
})
export class SendscheduleComponent {

  batches: any[] = [];
  selectedBatchId: any;
  topic: any;
  date: any;
  timing: any;
  joinLink: any;
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
        topic: this.topic,
        date: this.date,
        timing: this.timing,
        joinLink: this.joinLink
      };
      this.http.post('http://localhost:1020/b/sendschedule', formData).subscribe((response)=>{
        console.log(response)
        this.loading=false
      })
    }


}
