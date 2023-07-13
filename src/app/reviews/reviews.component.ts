import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  reviews!: any[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchReviews();
  }

  fetchReviews() {
    this.http.get<any[]>('http://localhost:1020/user/getreviews').subscribe(
      (response:any) => {
        this.reviews = response;
        
      },
      (error:any) => {
        console.log('Error retrieving reviews:', error);
      }
    );
  }

  deleteReview(reviewId: number) {
    this.http.delete(`http://localhost:1020/user/deletereview/${reviewId}`).subscribe(
      () => {
        // Remove the deleted review from the list
        this.reviews = this.reviews.filter((review) => review.reviewId !== reviewId);
      },
      (error:any) => {
        console.log('Error deleting review:', error);
      }
    );
  }

  approveReview(reviewId: number) {
    const review = this.reviews.find((review) => review.reviewId === reviewId);
    review.approved = true;

    this.http.put(`http://localhost:1020/user/approvereview/${reviewId}`, review).subscribe(
      () => {
        console.log('Review approved successfully');
      },
      (error:any) => {
        console.log('Error approving review:', error);
      }
    );
  }

}
