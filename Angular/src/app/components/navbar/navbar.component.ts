import { CommonModule } from '@angular/common';
import { Component , OnInit, DoCheck } from '@angular/core';
import {  Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  navbarOpen=false;
  loggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.loggedIn = this.checkLoginStatus();
    this.listenToStorageChanges();
  }

  checkLoginStatus(): boolean {
    return !!localStorage.getItem('authToken');
  }

  listenToStorageChanges() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'authToken') {
        this.loggedIn = !!localStorage.getItem('authToken');
      }
    });
  }

  logoutUser() {
    localStorage.removeItem('authToken');
    this.loggedIn = false;
    this.router.navigate(['/home']);
  }

}

