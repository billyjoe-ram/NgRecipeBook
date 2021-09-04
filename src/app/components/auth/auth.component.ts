import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthService, AuthResponseData } from 'src/app/services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  public isLoginMode: boolean = true;
  
  public isLoading: boolean = false;

  public error: string | null = null;

  private authSubs!: Subscription;
  
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;

      const email = form.value.email;
      const password = form.value.password;

      let authObs: Observable<AuthResponseData>;

      if (!this.isLoginMode) {
        authObs = this.auth.signup(email, password);
      } else {
        authObs = this.auth.login(email, password);
      }

      this.authSubs = authObs.subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
        setTimeout(() => { this.error = ""; }, 4000);
      })

      form.reset();
    } else {
      console.log("Formulário inválido...");
      return
    }
    
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

}
