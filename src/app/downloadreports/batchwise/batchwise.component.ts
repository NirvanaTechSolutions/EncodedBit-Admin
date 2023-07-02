import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-batchwise',
  templateUrl: './batchwise.component.html',
  styleUrls: ['./batchwise.component.css']
})
export class BatchwiseComponent {
  
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
    this.loading = true;
  
    const formData = {
      batchId: this.selectedBatchId,
    };
  
    this.http.post('http://localhost:1020/b/download-batch-report', formData, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        this.loading = false;
  
        // Create a Blob URL for the response data
        const blobUrl = URL.createObjectURL(response);
  
        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'batch-report'+this.selectedBatchId+'.xlsx';
        link.click();
  
        // Clean up the Blob URL
        URL.revokeObjectURL(blobUrl);
      });
  }

}
