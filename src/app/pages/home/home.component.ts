import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
	imports: [NgbCarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

	images = ["https://images.unsplash.com/photo-1727259066904-a7a1e43c6a5d",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
    "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36"];
}
