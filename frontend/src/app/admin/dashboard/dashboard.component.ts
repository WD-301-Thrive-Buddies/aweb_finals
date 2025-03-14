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
  contacts: any[] = [];
  newTestimonial = { name: '', testimonial: '', image: '', role: 'Client' };
  editedTestimonial: any = null;
  errorMessage: string = '';
  private apiTestimonials = 'https://sjhc-api.onrender.com/testimonials';
  private apiContact = 'https://sjhc-api.onrender.com/contacts';

  constructor(private router: Router, private http: HttpClient) {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      this.router.navigate(["/admin/login"]);
    } else {
      this.user = JSON.parse(storedUser);
      this.fetchTestimonials();
      this.fetchContacts();
    }
  }

  fetchTestimonials() {
    this.http.get<any[]>(this.apiTestimonials).subscribe((data) => {
      this.testimonials = data;
    });
  }

  addTestimonial() {
    if (!this.newTestimonial.name || !this.newTestimonial.testimonial || !this.newTestimonial.image || !this.newTestimonial.role) {
      this.errorMessage = "All fields are required!";
      return;
    }

    this.http.post(this.apiTestimonials, this.newTestimonial).subscribe(
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

    this.http.put(`${this.apiTestimonials}?id=${this.editedTestimonial._id}`, this.editedTestimonial).subscribe(
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
    this.http.delete(`${this.apiTestimonials}?id=${id}`).subscribe(
      () => this.fetchTestimonials(),
      (error) => console.error("Error deleting testimonial:", error)
    );
  }

  // CONTACT
  fetchContacts() {
    this.http.get<any[]>(this.apiContact).subscribe((data) => {
      this.contacts = data;
    });
  }

  deleteContact(id: string) {
    this.http.delete(`${this.apiContact}?id=${id}`).subscribe(
      () => this.fetchContacts(),
      (error) => console.error("Error deleting message:", error)
    );
  }

  
  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["/admin/login"]);
  }
}
