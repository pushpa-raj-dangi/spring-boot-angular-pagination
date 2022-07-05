import { Page } from './interfaces/page';
import { ApiResponse } from './interfaces/api-response';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  startWith,
} from 'rxjs';
import { UserServiceService } from './services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pagination';

  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);

  userState$: Observable<{
    appState: string;
    appData?: ApiResponse<Page>;
    error?: HttpErrorResponse;
  }>;
  currentPageSubject = new BehaviorSubject<number>(0);

  currentPage$ = this.currentPageSubject.asObservable();
  size: number = 5;

  constructor(private userService: UserServiceService) {}
  ngOnInit(): void {
    (this.userState$ = this.userService.users$().pipe(
      map((response: ApiResponse<Page>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(response.data.page.number);
        console.log(response);
        return {
          appState: 'APP_LOADED',
          appData: response,
        };
      })
    )),
      startWith({ appState: 'APP_LOADING' }),
      catchError((error: HttpErrorResponse) =>
        of({ appState: 'APP_ERROR', error })
      );
  }
  page(name?: string, pageNumber?: number, size?: number): void {
    (this.userState$ = this.userService.users$(name, pageNumber, size).pipe(
      map((response: ApiResponse<Page>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(response.data.page.number);
        console.log(response);
        return {
          appState: 'APP_LOADED',
          appData: response,
        };
      })
    )),
      startWith({
        appState: 'APP_LOADED',
        appData: this.responseSubject.value,
      }),
      catchError((error: HttpErrorResponse) =>
        of({ appState: 'APP_ERROR', error })
      );
  }

  nextOrPrevious(direction?: string, name?: string) {
    this.page(
      name,
      direction === 'forWard'
        ? this.currentPageSubject.value + 1
        : this.currentPageSubject.value - 1
    );
  }
}
