import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { PlaceHolderDirective } from 'src/app/directives/placeholder.directive';
import { AuthService, AuthResponseData } from 'src/app/services/auth.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  @ViewChild(PlaceHolderDirective, { static: false }) alertHost!: PlaceHolderDirective;
  
  public isLoginMode: boolean = true;
  
  public isLoading: boolean = false;

  public error: string | null = null;

  private authSubs!: Subscription;

  private closeSubs!: Subscription;
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

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
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
        setTimeout(() => { this.error = ""; }, 4000);
      })

      form.reset();
    } else {
      // console.log("Formulário inválido...");
      return
    }
    
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.error = null;
  }
  
  ngOnDestroy() {
    if (this.authSubs) {
      this.authSubs.unsubscribe();
    }

    if (this.closeSubs) {
      this.authSubs.unsubscribe();
    }
  }

  private showErrorAlert(errorMessage: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef  = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const alertCmpRef = hostViewContainerRef.createComponent(alertCmpFactory);

    alertCmpRef.instance.message = errorMessage;
    this.closeSubs = alertCmpRef.instance.close.subscribe(() => {
      this.closeSubs.unsubscribe();
      hostViewContainerRef.clear();
    });
  }


}
