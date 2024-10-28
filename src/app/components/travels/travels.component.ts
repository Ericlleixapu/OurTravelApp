import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-travels',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './travels.component.html',
  styleUrl: './travels.component.scss'
})
export class TravelsComponent {
  constructor(){}
  public travels = [1,2,3,4,5,6,7];

}
