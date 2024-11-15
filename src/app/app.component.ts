import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from "./components/logo/logo.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'dotsaway-root',
  standalone: true,
  imports: [RouterOutlet, LogoComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
