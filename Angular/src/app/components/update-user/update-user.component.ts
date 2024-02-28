import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from '../../interfaces/user.interfaces';
import { userResponse } from '../../interfaces/userResponse.interface';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {

  successMessage: string = '';
  errorMessage: string = '';

  updateUserForm!:FormGroup
  id!: string
  user!:User
  constructor(private fb: FormBuilder, private route:ActivatedRoute, private api: ApiService){

    this.getUserId()

    this.updateUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  getUserId(){
    this.route.params.subscribe(res=>{
      console.log(res['user_id']);
      this.id = res['user_id']

      this.getUserDetails()
    })
  }

  getUserDetails(){
    this.api.getOneUserDetails(this.id).subscribe(res=>{
      console.log(res);
      this.user = res.user[0]

      this.updateUserForm.get('name')?.setValue(this.user.name)
      this.updateUserForm.get('email')?.setValue(this.user.email)
      this.updateUserForm.get('password')?.setValue(this.user.password)

    })
  }

  updateUser() {
    if (this.updateUserForm.valid) {
      this.api.updateUserDetails(this.id, this.updateUserForm.value).subscribe({
        next: (res) => {

          this.successMessage = "User updated successfully!";
          this.errorMessage = '';

        },
        error: (error) => {

          this.errorMessage = "An error occurred while updating the user. Please try again.";
          this.successMessage = '';
        }
      });
    } else {

      this.errorMessage = "Please ensure all fields are filled out correctly.";
      this.successMessage = '';
    }
  }
}
