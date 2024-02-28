import { Component } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-bookings.component.html',
  styleUrl: './view-bookings.component.css'
})
export class ViewBookingsComponent {

  successMessage: string = '';
  errorMessage: string = '';

  bookingsArr: any[]=[];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  paginatedBookings: any[] = [];

  constructor(private bookings: BookingsService) {
    this.fetchBookings();
  }

  fetchBookings(){

    this.bookings.getBookings().subscribe(res=>{

      if (res.error) {
        console.log(res.error);
      } else if (res.bookings) {
        console.log(res.bookings);
        this.bookingsArr = res.bookings;
        this.updatePaginatedBookings();
      }
    })

    console.log (this.bookings)
  }
  updatePaginatedBookings() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBookings = this.bookingsArr.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedBookings();
  }

  maxPage(): number {
    return Math.ceil(this.bookingsArr.length / this.itemsPerPage);
  }

  // deletebooking(id: string) {
  //   this.bookings.deleteBooking(id).subscribe((res) => {
  //     console.log(res);
  //     this.fetchBookings();
  //   });
  // }


}

