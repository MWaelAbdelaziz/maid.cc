import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetail } from '../interfaces/user-detail';

const BASE_URL = 'https://reqres.in/api/users';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  constructor() {}
  getUsers(
    page: number | null = null,
    id: string | null = null,
  ): Observable<UserDetail> {
    if (id == null && page != null) {
      return this.http.get<UserDetail>(`${BASE_URL}?page=${page}`);
    } else {
      return this.http.get<UserDetail>(`${BASE_URL}/${id}`);
    }
  }
}
