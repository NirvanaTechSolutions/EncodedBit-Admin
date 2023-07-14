import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-updatebatch',
  templateUrl: './updatebatch.component.html',
  styleUrls: ['./updatebatch.component.css']
})
export class UpdatebatchComponent {
  batches:any
  selectedBatchId: any;
  link: any;
  loading=false
  selectedstudent:any
  unsetBatchStudents:any
  happy:any
  constructor(private main:StudentService,private http:HttpClient){
  this.main.getallbaches().then((response)=>{
    this.batches = response
    
    
  })

  this.main.getallstudents().then((response)=>{
    this.unsetBatchStudents = response
    
  })
  }

  onBatchChange() {
    if (this.selectedBatchId) {
      const url = `http://localhost:1020/b/students/getbatch/${this.selectedBatchId}`;
      this.http.get<{ names: string[] }>(url).subscribe(
        response => {
          this.selectedstudent = response;
          console.log(this.selectedstudent)
        
        },
        error => {
          console.error('Error fetching student names:', error);
        }
      );
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
  drag(event: DragEvent, student: any) {
    // Set the drag data to the student object
    event.dataTransfer?.setData('text/plain', JSON.stringify(student));
  }

  drop(event: DragEvent) {
    event.preventDefault();
  
    // Retrieve the dropped student data from the dataTransfer property
    const studentData = event.dataTransfer?.getData('text/plain');
    const student = studentData ? JSON.parse(studentData) : null;
    console.log(student)
    // Check if student data is not null before proceeding
    if (student) {
      // Determine the target container (selected or unset) based on the drop location
      const targetContainer = (event.target as HTMLElement).closest('.batch-section') ? 'selected' : 'unset';
  
      // Move the student from the source to the target container
      if (targetContainer === 'selected') {
        const studentIndex = this.unsetBatchStudents.findIndex((s:any) => s.usersub === student.usersub);
        if (studentIndex !== -1) {
          const movedStudent = this.unsetBatchStudents.splice(studentIndex, 1)[0];
          this.selectedstudent.push(movedStudent);
        }
      } else {
        const studentIndex = this.selectedstudent.findIndex((s:any) => s.usersub === student.usersub);
        if (studentIndex !== -1) {
          const movedStudent = this.selectedstudent.splice(studentIndex, 1)[0];
          this.unsetBatchStudents.push(movedStudent);
        }
      }
    }
  }
  
  
  save() {
    this.loading = true
    const selectedUserSubs = this.selectedstudent.map((student:any) => student.usersub);
    const unsetUserSubs = this.unsetBatchStudents.map((student:any) => student.usersub);
    this.http.post('http://localhost:1020/b/selectedStudents', { selectedStudents: selectedUserSubs, batchId: this.selectedBatchId })
    .subscribe(
      response => {
        console.log('Selected students updated:', response);
        // Handle any additional logic after successful update
      },
      error => {
        console.error('Error updating selected students:', error);
        // Handle error scenarios
      }
    );

  // Call the endpoint to update the unselected students
  this.http.post('http://localhost:1020/b/unselectedStudents', { unselectedStudents: unsetUserSubs })
    .subscribe(
      response => {
        console.log('Unselected students updated:', response);
        // Handle any additional logic after successful update
      },
      error => {
        console.error('Error updating unselected students:', error);
        // Handle error scenarios
      }
    );

    this.loading = false
    this.happy = true
    setTimeout(() => {
     this.happy = false
      
    }, 3000);

  }

  
  

  }

