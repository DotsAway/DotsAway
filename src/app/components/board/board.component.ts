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

  protected draggingCell: Cell | null = null;
  protected isDragging = false;

  @ViewChildren('cell') cellElementRefs!: QueryList<ElementRef>;
  @ViewChildren('circle') circleElementRefs!: QueryList<ElementRef>;
  @ViewChildren('overlay') overlayElementRefs!: QueryList<ElementRef>;

  constructor(
    private route: ActivatedRoute,
    private seedService: SeedService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
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

    this.overlayElementRefs.forEach((overlayRef) => {
      this.renderer.setStyle(overlayRef.nativeElement, 'width', `${cellRect.width - 2}px`);
      this.renderer.setStyle(overlayRef.nativeElement, 'height', `${cellRect.height - 2}px`);
    });
  }

  getOverlayNativeElement(cell: Cell): any {
    return this.overlayElementRefs.get(cell.index)?.nativeElement;
  }

  colorOverlay(cell: Cell, color: string | null): void {
    const colorWithoutAlpha = color?.substring(0, 7);
    const colorWithAlpha = colorWithoutAlpha + "80"; // 50% alpha

    const overlayNativeElement = this.getOverlayNativeElement(cell);
    this.renderer.setStyle(overlayNativeElement, "background-color", colorWithAlpha);
  }

  removeOverlay(cell: Cell): void {
    const overlayNativeElement = this.getOverlayNativeElement(cell);
    this.renderer.setStyle(overlayNativeElement, "background-color", null);
  }

  onCellClick(cell: Cell): void {
    if (!this.draggingCell) {
      this.draggingCell = cell;
      this.colorOverlay(cell, this.draggingCell.color);
      return;
    }

    if (cell.color === null) {
      this.colorOverlay(cell, this.draggingCell.color);
    } else {
      this.draggingCell = cell;
      this.colorOverlay(cell, this.draggingCell.color);
    }
  }
}
