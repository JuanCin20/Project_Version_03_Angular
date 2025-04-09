import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = 'http://localhost:8080/api/rest/user';

  constructor(private httpClient: HttpClient) {}

  getUsersList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}` + '/all');
  }

  createUser(user: User): Observable<Object> {
    user.roleEntities = [
      {
        roleId: 1,
        enumRole: 'Developer',
        roleRegister: '06/04/2025',
      },
      {
        roleId: 2,
        enumRole: 'Administrator',
        roleRegister: '06/04/2025',
      },
    ];
    user.userBirth = '08/06/2004';
    user.userState = true;
    user.userRegister = '06/04/2025';
    user.userNotAccountExpired = true;
    user.userNotAccountBlocked = true;
    user.userCredentialNotExpired = true;
    return this.httpClient.post(`${this.baseURL}` + '/save', user);
  }
}