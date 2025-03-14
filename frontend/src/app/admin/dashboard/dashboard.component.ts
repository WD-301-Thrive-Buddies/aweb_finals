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
    if (!this.newTestimonial.name || !this.newTestimonial.testimonial) return;

    this.http.post(this.apiUrl, this.newTestimonial).subscribe(
      () => {
        this.fetchTestimonials();
        this.newTestimonial = { name: '', testimonial: '', image: '', role: 'Client' };
      },
      (error) => console.error("Error adding testimonial:", error)
    );
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
