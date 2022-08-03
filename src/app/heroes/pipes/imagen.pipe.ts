import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  heroe!: Heroe;
  
  transform( heroe : Heroe):string {
      
    return `assets/heroes/${heroe.id}.jpg`;
  }

}
