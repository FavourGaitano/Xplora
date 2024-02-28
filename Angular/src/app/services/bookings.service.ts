import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {bookingsResponse, bookingsResponse0} from '../interfaces/bookingsResponse.interface';


@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  token = localStorage.getItem('authToken') as string
  constructor(private http:HttpClient) { }

  getBookings(){
    const token = localStorage.getItem('authToken') as string
    return this.http.get<bookingsResponse>('http://localhost:3001/bookings/get', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }




  getOneBookingDetails(id:string){
    const token = localStorage.getItem('authToken') as string

    return this.http.get<bookingsResponse>(` http://localhost:3001/bookings/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }

  getUserBooking(id:string){
    const token = localStorage.getItem('authToken') as string

    return this.http.get<bookingsResponse0>(` http://localhost:3001/bookings/userID/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }

  cancelBooking(booking_id:string){
    const token = localStorage.getItem('authToken') as string
    console.log('Cancelling booking in service:', token);

    console.log('Cancelling booking in service:', booking_id);
    return this.http.put(`http://localhost:3001/bookings/cancel/${booking_id}`, {
      headers: new HttpHeaders({
        token: token
      })
    })
  }






}
