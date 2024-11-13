import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dotsaway-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  constructor(
    private router: Router
  ) {}

  goToSeed(seed: string | null): void {
    this.router.navigate(['/board', { seed }]);
  }
}
