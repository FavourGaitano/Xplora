import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {  userResponse } from '../../interfaces/userResponse.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css',
})
export class ViewUsersComponent {
  usersArr: any[] = [];
  created_at = new Date()
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private api: ApiService) {
    this.fetchUsers();
  }

  fetchUsers() {
    this.api.getUsers().subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.users) {
        console.log(res.users);
        this.usersArr = res.users;
      }
    });
  }



  deleteUser(id: string) {
    this.api.deleteUser(id).subscribe({
      next: (res) => {
        console.log(res);
        this.successMessage = 'User deleted successfully.';
        this.errorMessage = '';
        this.fetchUsers();
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Failed to delete the user. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
