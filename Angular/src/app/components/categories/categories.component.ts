import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CategoryDetails } from '../../interfaces/categories.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  categoryForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]]
      // description: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {}

  createCategory(): void {
    if (this.categoryForm.valid) {
      this.authService.createCategory(this.categoryForm.value).subscribe({
        next: (categoryResponse) => {
          console.log(categoryResponse);
        },
        error: (error) => {
          console.error("Category creation failed", error);
        }
      });
    } else {
      console.error("Category form is invalid");
    }
  }


  


}
