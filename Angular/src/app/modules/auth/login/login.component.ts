import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import {AuthService} from  '../../../core/services/auth.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  dataLogin:{};

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router : Router) { }

  postAuthLogin(dataLogin:{}){
    this.auth.authLogin(dataLogin)
    .subscribe(
      res => {
        let success:any  = res;
        console.log("res: ", res)
        this.dataLogin = success.access_token;
        let token = success.access_token;
        this.auth.settokendataCliente(res)
        this.auth.setTokenClient(token)
        //this.router.navigate(['/home-default']);

    },
      err => console.log(err)
    )
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmitLogin() {
    this.submitted = true;

    //deténgase aquí si el formulario no es válido
    if (this.loginForm.invalid) {
        return;
    }
    this.postAuthLogin(this.loginForm.value)
    console.log(this.loginForm.value)
  }

}
