import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { CountUpModule } from 'ngx-countup';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink, CountUpModule, NgFor, NgIf, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // testimonials = [
  //   {
  //     image: "https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     text: "The care and attention I received were beyond my expectations. The team truly made a difference in my life.",
  //     name: "Sarah Johnson",
  //     role: "Client"
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     text: "The staff is kind and professional. I felt safe and cared for throughout my journey.",
  //     name: "Michael Smith",
  //     role: "Client"
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1520799139422-a4a178de50ae?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     text: "I couldn't have asked for better support. Their expertise and compassion were life-changing.",
  //     name: "Emily Brown",
  //     role: "Client"
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1534180477871-5d6cc81f3920?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     text: "I couldn't have asked for better support. Their expertise and compassion were life-changing.",
  //     name: "Emily Brown",
  //     role: "Client"
  //   }
  // ];

  statistics = [
    { title: 'Lives Transformed', count: 60 },
    { title: 'Expert Caregivers', count: 20 },
    { title: 'Years of Service', count: 4 }
  ];

  readonly APIUrl="https://sjhc-api.onrender.com/testimonials";
  

  constructor(private http:HttpClient){
  }
  
  testimonials:any=[];

  refreshTestimonials(){
    this.http.get(this.APIUrl).subscribe(data=>{
      this.testimonials=data;
    })
  }
  ngOnInit(){
    this.refreshTestimonials();
  }

  addTestimonials(){
    var newName=(<HTMLInputElement>document.getElementById("newName")).value;
    var newTestimonial=(<HTMLInputElement>document.getElementById("newTestimonial")).value;
    var newImage=(<HTMLInputElement>document.getElementById("newImage")).value;
    var formData=new FormData();
    formData.append("name", newName);
    formData.append("testimonial", newTestimonial);
    formData.append("image", newImage);
    this.http.post(this.APIUrl, formData).subscribe(data=>{
      alert(data);
      this.refreshTestimonials()
    })
  }
  
  deleteTestimonials(id:any){
      this.http.delete(this.APIUrl+'?id='+id).subscribe(data=>{
      alert(data);
      this.refreshTestimonials()
    })
  }

  currentIndex = 0;

  prevTestimonial() {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  nextTestimonial() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }
}

