import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule, ButtonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() cardInfo: any;

  constructor(private router: Router) {}

  /**
   * Return the image url by amending poster path to image origin.
   * @param poster_path
   * @returns
   */
  public getImageUrl(poster_path: string): string {
    return `https://image.tmdb.org/t/p/original${poster_path}`;
  }

  /**
   * Navigate to movie details.
   * @param infoId
   */
  public moreDetails(infoId: number): void {
    this.router.navigate(['details', { id: infoId }]);
  }
}
