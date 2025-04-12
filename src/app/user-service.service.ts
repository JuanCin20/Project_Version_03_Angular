import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { Role } from './role';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = 'http://localhost:8080/api/rest/user';

  constructor(private httpClient: HttpClient) {}

  public getUsersList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}` + '/all');
  }

  public getRolesList(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.baseURL}` + '/allRoleEntities');
  }

  private getCurrentDate(): string {
    const userRegister = new Date();
    return userRegister.toLocaleDateString('en-GB');
  }

  public createUser(user: User): Observable<Object> {
    user.userState = true;
    user.userRegister = this.getCurrentDate();
    user.userNotAccountExpired = true;
    user.userNotAccountBlocked = true;
    user.userCredentialNotExpired = true;
    return this.httpClient.post(`${this.baseURL}` + '/save', user);
  }
}