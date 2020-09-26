import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


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
    localStorage.setItem("current",user_tring);
  }

  setTokenClient(token):void{
    localStorage.setItem("accessToken", token);
  }

}
