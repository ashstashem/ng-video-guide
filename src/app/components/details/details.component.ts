import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { Observable, take } from 'rxjs';
import { MovieDetails } from '../../models/movie.model';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DividerModule,
    ChipModule,
    ButtonModule,
    RatingModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  details$!: Observable<MovieDetails>;
  value!: number;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private router: Router
  ) {}

  /**
   * On Init hook to get movie id from route data and load move details based on movie Id.
   */
  ngOnInit(): void {
    this.route.params.subscribe((routeData: any) => {
      this.details$ = this.videoService.getMovieDetails(routeData.id);
    });
  }

  /**
   * Return poster url by appending poster_path to string.
   * @param poster_path
   * @returns
   */
  public getImageUrl(poster_path: string): string {
    return `https://image.tmdb.org/t/p/original${poster_path}`;
  }

  /**
   * Go back to home page.
   */
  public goBack(): void {
    this.router.navigate(['/home']);
  }

  /**
   * Add rating
   * @param event
   * @param id
   */
  public addRating(event: number, id: number) {
   this.videoService.rateMovie(event, id).pipe(take(1));
  }

  /**
   * Returns user to login screen.
   */
  public logout(): void {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }
}
