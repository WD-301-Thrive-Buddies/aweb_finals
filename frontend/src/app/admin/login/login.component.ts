import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  errorMessage: string = "";
  private apiUrl = "http://localhost:5000/login";

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<{ success: boolean; user?: any }>(this.apiUrl, {
      username: this.username,
      password: this.password
    }).subscribe(
      (res) => {
        if (res.success && res.user) {
          localStorage.setItem("user", JSON.stringify(res.user));
          this.router.navigate(["/admin/dashboard"]);
        }
      },
      () => {
        this.errorMessage = "Invalid username or password";
      }
    );
  }
}
