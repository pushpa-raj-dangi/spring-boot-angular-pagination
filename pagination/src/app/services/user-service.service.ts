import { Page } from './../interfaces/page';
import { ApiResponse } from './../interfaces/api-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  users$ = (
    name: string = '',
    page: number = 0,
    size: number = 5
  ): Observable<ApiResponse<Page>> =>
    this.http.get<ApiResponse<Page>>(
      `http://localhost:8085/users?name=${name}&page=${page}&size=${size}`
    );

  // getUsers(
  //   name: string = '',
  //   page: number = 0,
  //   size: number = 10
  // ): Observable<ApiResponse<Page>> {
  //   return this.http
  //     .get<ApiResponse<Page>>(
  //       `localhost:8085/users/name=${name}&page=${page}&size=${size}`
  //     )
  //     .pipe((data) => data);
  // }
}
