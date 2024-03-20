import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import {
  ErrorResponse,
  SuccessResponse,
  UserDetails,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private headerOptions = {
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer access token', // TODO: use access token here(themoviedb account) think of better way to do this
    },
  };

  constructor(private httpClient: HttpClient) {}

  /**
   * Get auth token to authorise user.
   * @returns
   */
  private getToken(): Observable<string> {
    return this.httpClient
      .get<SuccessResponse>(
        'https://api.themoviedb.org/3/authentication/token/new',
        this.headerOptions
      )
      .pipe(map((response) => response.request_token));
  }

  /**
   * Validate user using email, password and auth token.
   * @param userDetails
   * @param token
   * @returns
   */
  validateWithLogin(
    userDetails: UserDetails,
    token: string
  ): Observable<SuccessResponse> {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization:
        'Bearer access token', // TODO: use access token here(themoviedb account) think of better way to do this
      },
    };
    const body = JSON.stringify({
      username: userDetails.username,
      password: userDetails.password,
      request_token: token,
    });
    return this.httpClient.post<SuccessResponse>(
      `https://api.themoviedb.org/3/authentication/token/validate_with_login`,
      body,
      options
    );
  }

  /**
   * Login to the movie db and the system by making a call to getToken and validatingWithLogin.
   * @param userDetails
   * @returns
   */
  login(userDetails: UserDetails): Observable<SuccessResponse | ErrorResponse> {
    return this.getToken().pipe(
      switchMap((token) =>
        this.validateWithLogin(userDetails, token).pipe(
          catchError((errorResp) => of(errorResp.error))
        )
      )
    );
  }
}
