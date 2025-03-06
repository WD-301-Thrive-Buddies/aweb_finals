import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { CountUpModule } from 'ngx-countup';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink, CountUpModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  testimonials = [
    {
      image: "https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "The care and attention I received were beyond my expectations. The team truly made a difference in my life.",
      name: "Sarah Johnson",
      role: "Client"
    },
    {
      image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "The staff is kind and professional. I felt safe and cared for throughout my journey.",
      name: "Michael Smith",
      role: "Client"
    },
    {
      image: "https://images.unsplash.com/photo-1520799139422-a4a178de50ae?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "I couldn't have asked for better support. Their expertise and compassion were life-changing.",
      name: "Emily Brown",
      role: "Client"
    },
    {
      image: "https://images.unsplash.com/photo-1534180477871-5d6cc81f3920?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "I couldn't have asked for better support. Their expertise and compassion were life-changing.",
      name: "Emily Brown",
      role: "Client"
    }
  ];

  statistics = [
    { title: 'Lives Transformed', count: 60 },
    { title: 'Expert Caregivers', count: 20 },
    { title: 'Years of Service', count: 4 }
  ];

  currentIndex = 0;

  prevTestimonial() {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  nextTestimonial() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }
}
