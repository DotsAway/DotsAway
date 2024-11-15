import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dotsaway-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  constructor(
    private router: Router
  ) {}

  goToMenu(): void {
    this.router.navigate(['/']);
  }
}
