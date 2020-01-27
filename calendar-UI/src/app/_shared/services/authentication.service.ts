import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import User from 'src/app/_shared/models/user.model';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient) { }

    public register(user: User) {
        return this.http.post(`/api/auth/register`, user);
    }

    public login(user: User) {
        return this.http.post<any>(`/api/auth/login`, user)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}