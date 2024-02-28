import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {loginDetails} from '../interfaces/login.interfaces';
import {registerDetails} from '../interfaces/register.interfaces';
import { CategoryDetails } from '../interfaces/categories.interface';
import { Tour } from '../interfaces/tours.interface';
import {Booking} from '../interfaces/bookings.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  registerUser(user_details:registerDetails ){
    return this.http.post<{message:string, error:string}>('http://localhost:3001/users', user_details)
  }




  loginUser(user_details:loginDetails ){
    return this.http.post<{message:string, token:string, error:string}>('http://localhost:3001/auth', user_details)
  }


  // token: string = JSON.parse(localStorage.getItem('authToken') as string);


  readToken(callback: (response: any) => void, errorCallback: (error: any) => void){

    const token = localStorage.getItem('authToken');

    if (!token) {
      errorCallback('No token found in local storage.');
      return;
    }


    console.log(token)
    this.http.get<{info:{id:string, email: string, role:string}}>('http://localhost:3001/auth/checkdetails', {
      headers: new HttpHeaders( {
        'Content-type': 'application/json',
       token

      })
    }).subscribe(res=>callback(res))
  }

  createCategory(category_details:CategoryDetails){

    return this.http.post<{message:string, error:string}>('http://localhost:3001/categories', category_details)
  }

  createTour(tour_details:Tour){

    return this.http.post<{message:string, error:string}>('http://localhost:3001/tours', tour_details)
  }

  createBooking(booking_details:Booking){

    return this.http.post<{message:string, error:string}>('http://localhost:3001/bookings', booking_details)
  }



}
