import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user: any = null;
  testimonials: any[] = [];
  newTestimonial = { name: '', testimonial: '', image: '', role: 'Client' };
  editedTestimonial: any = null;
  errorMessage: string = '';
  private apiUrl = 'https://sjhc-api.onrender.com/testimonials'; 

  constructor(private router: Router, private http: HttpClient) {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      this.router.navigate(["/admin/login"]);
    } else {
      this.user = JSON.parse(storedUser);
      this.fetchTestimonials();
    }
  }

  fetchTestimonials() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.testimonials = data;
    });
  }

  addTestimonial() {
    if (!this.newTestimonial.name || !this.newTestimonial.testimonial || !this.newTestimonial.image || !this.newTestimonial.role) {
      this.errorMessage = "All fields are required!";
      return;
    }

    this.http.post(this.apiUrl, this.newTestimonial).subscribe(
      () => {
        this.fetchTestimonials();
        this.newTestimonial = { name: '', testimonial: '', image: '', role: 'Client' };
        this.errorMessage = '';
      },
      (error) => console.error("Error adding testimonial:", error)
    );
  }

  editTestimonial(testimonial: any) {
    this.editedTestimonial = { ...testimonial };
  }

  updateTestimonial() {
    if (!this.editedTestimonial) return;

    this.http.put(`${this.apiUrl}?id=${this.editedTestimonial._id}`, this.editedTestimonial).subscribe(
      () => {
        this.fetchTestimonials();
        this.editedTestimonial = null;
      },
      (error) => console.error("Error updating testimonial:", error)
    );
  }

  cancelEdit() {
    this.editedTestimonial = null;
  }

  deleteTestimonial(id: string) {
    this.http.delete(`${this.apiUrl}?id=${id}`).subscribe(
      () => this.fetchTestimonials(),
      (error) => console.error("Error deleting testimonial:", error)
    );
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["/admin/login"]);
  }
}
