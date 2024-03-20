import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable, map, take, tap } from 'rxjs';
import { Movie, Results } from '../../models/movie.model';
import { AuthService } from '../../services/auth.service';
import { VideoService } from '../../services/video.service';
import { CardComponent } from '../card/card.component';

interface PaginatorEvent {
  first?: number;
  page?: number;
  pageCount?: number;
  rows?: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    PaginatorModule,
    PanelModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public rowPerPage: number = 20;
  public totalRecords: number = 10000;
  public first: number = 1;
  public rows: number = 10;
  public movies$!: Observable<Movie[]>;

  constructor(
    private videoService: VideoService,
    private auth: AuthService,
    private router: Router
  ) {}

  /**
   * On Init hook retrieves movies from service and asigns to movie$ obsvable.
   */
  public ngOnInit(): void {
    this.movies$ = this.videoService.getMovies().pipe(
      take(1),
      map((data: Results) => data.results)
    );
  }

  /**
   * On paginate capture page and change it returning movies for the selected page.
   * @param event
   */
  public onPageChange(event: PaginatorEvent): void {
    const page = event?.page || 1;
    this.movies$ = this.videoService.getMovies(page + 1).pipe(
      take(1),
      map((data: Results) => data.results)
    );
  }

  /**
   * Returns user to login screen.
   */
  public logout(): void {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }
}
