import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { UserInterface} from '../../shared/model/user-interface';
import { isNullOrUndefined } from "util";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = environment.apiURL;
  url = environment.url;
  postAuth : string;

  constructor(private httpAuth : HttpClient ) {
    this.postAuth = `${this.apiURL}${this.url}auth/login`;
   }

   authLogin(dataLogin:{}){
    return this.httpAuth.post(`${this.postAuth}`, dataLogin);
  }

  settokendataCliente(dataLogin:{}):void{
    let user_tring = JSON.stringify(dataLogin)
    localStorage.setItem("currentUser",user_tring);
  }

  setTokenClient(token):void{
    localStorage.setItem("accessToken", token);
  }

  getCurrentUser(): UserInterface {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: UserInterface = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

}
