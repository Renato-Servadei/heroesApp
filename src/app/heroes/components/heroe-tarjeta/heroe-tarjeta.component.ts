import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
  mat-card {
    margin-top: 18px;
    margin-bottom: 10px;
  }`]
})
export class HeroeTarjetaComponent {

  @Input() heroe!: Heroe;
}


