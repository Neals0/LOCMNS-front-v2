import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: User[] = [
    { username: 'admin', password: 'admin', roles: ['ADMIN'] },
    { username: 'fianso', password: '123', roles: ['USER'] },
  ];

  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];

  constructor(private router: Router) {}

  SignIn(user: User): Boolean {
    let validUser: Boolean = false;

    this.users.forEach((currentUser) => {
      if (
        user.username == currentUser.username &&
        user.password == currentUser.password
      ) {
        validUser = true;
        this.loggedUser = currentUser.username;
        this.isloggedIn = true;
        this.roles = currentUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }

  isAdmin(): Boolean {
    if (!this.roles) {
      //this.roles== undefiened
      return false;
    } else {
      return this.roles.indexOf('ADMIN') > -1;
    }
  }

  logOut() {
    this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    this.getUserRoles(login);
  }

  getUserRoles(username: string) {
    this.users.forEach((currentUser) => {
      if (currentUser.username == username) {
        this.roles = currentUser.roles;
      }
    });
  }

}
