import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersComponent } from './components/users/users.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { ViewToursComponent } from './components/view-tours/view-tours.component';
import { UpdateTourComponent } from './components/update-tour/update-tour.component';
import { ToursComponent } from './components/tours/tours.component';
import { ViewBookingsComponent } from './components/view-bookings/view-bookings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserViewToursComponent } from './components/user-view-tours/user-view-tours.component';
import { UserViewBookingsComponent } from './components/user-view-bookings/user-view-bookings.component';



export const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    {path: 'view-users', component: ViewUsersComponent},
    {path: 'update-user/:user_id', component: UpdateUserComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'view-category', component: ViewCategoryComponent},
    {path: 'update-category/:category_id', component: UpdateCategoryComponent},
    {path: 'view-tours', component: ViewToursComponent},
    {path: 'update-tour/:tour_id', component: UpdateTourComponent},
    {path: 'tours', component: ToursComponent},
    {path: 'view-bookings', component: ViewBookingsComponent},
  ]},
  {path:'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path:'reviews', component: ReviewsComponent, canActivate: [AuthGuard]},
  {path:'user-view-tours', component: UserViewToursComponent,  canActivate: [AuthGuard]},
  {path: 'user-view-bookings', component: UserViewBookingsComponent,  canActivate: [AuthGuard]},
  {path:'**', component: NotFoundComponent}




];
