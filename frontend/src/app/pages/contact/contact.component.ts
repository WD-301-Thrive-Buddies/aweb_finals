import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm = { name: '', email: '', message: '' };
  private apiUrl = 'https://sjhc-api.onrender.com/contacts';

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      alert("All fields are required!");
      return;
    }

    this.http.post(this.apiUrl, this.contactForm).subscribe(
      () => {
        alert("Message sent successfully!");
        this.contactForm = { name: '', email: '', message: '' }; // Reset form
      },
      (error) => console.error("Error sending message:", error)
    );
  }
}
