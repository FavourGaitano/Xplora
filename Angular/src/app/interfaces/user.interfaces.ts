export interface User{
  user_id:string;
  name:string;
  email:string;
  role?:string;
  password:string;

}

export interface updateUser{
  name:string;
  email:string;
  password:string;

}
