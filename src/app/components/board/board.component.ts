import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dotsaway-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  private seed: string | null;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.seed = this.route.snapshot.paramMap.get('seed');
  }
}
