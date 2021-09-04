import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from '../components/auth/user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	user = new BehaviorSubject<User | null>(null);
	
  private signUpEdp: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdtaUu-XC6dTQQ1Q0ma2gJvnxWcgUpwO8";

  private loginEdp: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdtaUu-XC6dTQQ1Q0ma2gJvnxWcgUpwO8";

  private tokenExpirationTimer!: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
  	return this.http.post<AuthResponseData>(this.signUpEdp,
        { 
          email: email,
          password: password,
          returnSecureToken: true 
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
      }));
  }

	login(email: string, password: string) {
		return this.http.post<AuthResponseData>(
      this.loginEdp,
        { 
          email: email,
          password: password,
          returnSecureToken: true 
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
	}

  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem('userData') as string);
    if(!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.token,
      new Date(userData.tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData.tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
    
  }

  logout() {
    this.user.next(null)
    this.router.navigate(['/auth']);

    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "";
    let errorResMessage = errorRes.error.error.message;

    if (!errorRes.error || !errorRes.error.error) {				
      return throwError(errorMessage);
    }

    switch (errorResMessage) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = "Este e-mail não está registrado";
      break;
      case 'EMAIL_EXISTS':
        errorMessage = "Este e-mail já está registrado";
      break;
      case 'INVALID_PASSWORD':
        errorMessage = "Senha incorreta";
      break;
      case 'USER_DISABLED':
        errorMessage = "Este usuário foi desativado";
      break;
      default:
        errorMessage = "Um erro inesperado ocorreu";
      break;
    }

    return throwError(errorMessage);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }

}
