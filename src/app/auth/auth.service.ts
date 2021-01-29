import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthData } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };

    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };

    this.http
      .post('http://localhost:3000/api/user/login', authData)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
