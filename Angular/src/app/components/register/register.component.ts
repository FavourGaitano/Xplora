import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  successMessage: string = '';
  errorMessage: string = '';


  registerForm! : FormGroup

  constructor( private fb:FormBuilder, private authService:AuthService,private router:Router) {

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  registerUser(): void {
    if (this.registerForm.valid) {
      this.authService.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Registration successful. Redirecting to login...';
          setTimeout(() => this.router.navigate(['login']), 2000);
        },
        error: (error) => {
          console.error("Registration failed", error);
          this.errorMessage = 'Registration failed. Please check your details and try again.';
        }
      });
    } else {
      this.errorMessage = 'The form is invalid. Please check the entered details.';
    }
  }

}
