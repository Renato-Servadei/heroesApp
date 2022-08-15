import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width: 80%;
    border-radius: 5px;
  }`]

})
export class AgregarComponent implements OnInit {

  publishers = [
    { id: "Dc Comics", desc: "Dc - Comics"},
    { id: "Marvel", desc: "Marvel"},
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }
  constructor(private heroeService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
    .pipe (
      switchMap (({id}) => this.heroeService.getHeroesPorId (id))
    )
    .subscribe ( heroe => this.heroe = heroe)
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return
    }

    if (this.heroe.id) {
      this.heroeService.actualizarHeroe( this.heroe)
      .subscribe (heroe => console.log ('Actualizando', heroe))
    }
    else {
    this.heroeService.agregarHeroe(this.heroe)
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id])
      })
    }
    
  }

}
