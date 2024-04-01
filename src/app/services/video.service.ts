import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetails, Results } from '../models/movie.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  public api_key = this.authService.api_key;

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Get list of movies by page.
   * @param page
   * @returns Observable<Movie[]>
   */
  public getMovies(page: number = 1): Observable<Results> {
    return this.http.get<Results>(
      `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=${this.api_key}`,
    );
  }

  /**
   * Get movie details for selected movie by id.
   * @param id
   * @returns
   */
  public getMovieDetails(id: number): Observable<MovieDetails> {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
    return this.http.get<MovieDetails>(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this.api_key}`,
      options
    );
  }

  /**
   * Rate a movie by parsing the movie id and new rating to api.
   * @param rating
   * @param movie_id
   * @returns
   */
  public rateMovie(rating: number, movie_id: number) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },

    };
    const body = {
      movie_id: movie_id,
      value: rating
    }

    return this.http.post(
      `https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=${this.api_key}`,
      body,
      options
    );
  }
}
