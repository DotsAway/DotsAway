import { Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameContext } from '../../models/game-context.model';
import { SeedService } from '../../services/seed.service';
import { Cell } from '../../models/cell.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dotsaway-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  protected gameContext: GameContext | null = null;
  protected grid: Cell[][] = [];
  protected gridTemplateColumns: string = "";
  protected circleOffset: number = 20;
  protected activeColor: string = "";

  @ViewChildren('cell') cellElementRefs!: QueryList<ElementRef>;
  @ViewChildren('circle') circleElementRefs!: QueryList<ElementRef>;

  constructor(
    private route: ActivatedRoute,
    private seedService: SeedService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.activeColor = "";

    const seed = this.route.snapshot.paramMap.get('seed');
    this.gameContext = this.seedService.parse(seed ?? '');

    if (this.gameContext) {
      this.gridTemplateColumns = `repeat(${this.gameContext.width}, 1fr)`;
    }
  }

  ngAfterViewInit(): void {
    const cellRect = this.cellElementRefs.get(0)?.nativeElement.getBoundingClientRect();

    this.circleElementRefs.forEach((circleRef) => {
      this.renderer.setStyle(circleRef.nativeElement, 'width', `${cellRect.width - this.circleOffset}px`);
      this.renderer.setStyle(circleRef.nativeElement, 'height', `${cellRect.height - this.circleOffset}px`);
    });
  }

  onCircleClick(cell: Cell): void {
    if (!cell.color) {
      return;
    }

    this.activeColor = cell.color;
  }
}
