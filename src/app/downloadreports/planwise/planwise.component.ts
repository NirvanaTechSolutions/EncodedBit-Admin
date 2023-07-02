import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-planwise',
  templateUrl: './planwise.component.html',
  styleUrls: ['./planwise.component.css']
})
export class PlanwiseComponent {
  loading=false

  batches:any
  selectedBatchId: any;
  link: any;
 
  constructor(private main:StudentService,private http:HttpClient){}


  onSubmit() {
    this.loading = true;


  
    const formData = {
      plan: this.selectedBatchId,
    };
  
    this.http.post('http://localhost:1020/b/download-plan-report', formData, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        this.loading = false;
  
        // Create a Blob URL for the response data
        const blobUrl = URL.createObjectURL(response);
  
        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'plan-report '+this.selectedBatchId+'.xlsx';
        link.click();
  
        // Clean up the Blob URL
        URL.revokeObjectURL(blobUrl);
      });
  }
}
