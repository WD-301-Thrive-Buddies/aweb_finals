import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user: any = null;

  constructor(private router: Router) {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      this.router.navigate(["/admin/login"]);
    } else {
      this.user = JSON.parse(storedUser);
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["/admin/login"]);
  }
}
