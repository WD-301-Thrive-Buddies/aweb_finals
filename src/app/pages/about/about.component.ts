import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CarouselModule, NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  resources = [
    {
      image: "https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=2070&auto=format&fit=crop",
      title: "Understanding Anxiety",
      desc: "A guide to recognizing and managing anxiety effectively.",
      link: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=2070&auto=format&fit=crop",
      title: "The Importance of Self-Care",
      desc: "Simple strategies to improve your daily mental well-being.",
      link: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=2070&auto=format&fit=crop",
      title: "Caring for Aging Parents",
      desc: "How to provide the best support for elderly family members.",
      link: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=2070&auto=format&fit=crop",
      title: "How to Manage Stress",
      desc: "Practical ways to cope with stress and anxiety in daily life.",
      link: "#"
    }
  ];

  carouselOptions = {
    loop: true,
    margin: 15,
    dots: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: false,
    autoplayTimeout: 3000,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 3 }
    }
  };
}
