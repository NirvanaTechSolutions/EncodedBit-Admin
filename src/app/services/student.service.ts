import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Student {
  _id: string;
  name: string;
  plan:string
  // Add other properties if needed
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(public http: HttpClient) {}


  

  async getallstudents() : Promise<any>
  {
  
    return new Promise(async (resolve, reject) => {
      
       this.http.get(`http://localhost:1020/user/unsetBatchId`).subscribe((response)=>{
        resolve(response)
       }
       )
        
    });
  }
  async getallbaches() : Promise<any>
  {
  
    return new Promise(async (resolve, reject) => {
      
       this.http.get(`http://localhost:1020/b/getbatches`).subscribe((response)=>{
        resolve(response)
       }
       )
        
    });
  }

  

  searchStudents(query: string): Observable<Student[]> {
    const url = `http://localhost:1020/user/getstudents?query=${encodeURIComponent(query)}`;
    return this.http.get<Student[]>(url);
  }
}
