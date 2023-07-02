import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { HttpClient } from '@angular/common/http';
declare const basic: any;
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    basic()
  }  constructor(private http: HttpClient) { }


  downloadExcelReport(): void {
    this.http.get(`http://localhost:1020/user/allstudentsexcel`, { responseType: 'blob' }).subscribe((response: Blob) => {


      const fileName = 'student-report.xlsx';
      saveAs(response, fileName);
    });
  }

  

}
