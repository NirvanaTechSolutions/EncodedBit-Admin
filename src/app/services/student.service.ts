import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(public http: HttpClient) {}


  

  async getallstudents() : Promise<any>
  {
  
    return new Promise(async (resolve, reject) => {
      
       this.http.get(`http://localhost:1020/user/getallusers`).subscribe((response)=>{
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

  
}
