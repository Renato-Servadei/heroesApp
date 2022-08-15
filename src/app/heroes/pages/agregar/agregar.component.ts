import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
              private router: Router,
              private snackBar: MatSnackBar) { }

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
      .subscribe (heroe => this.mostrarSnackBar('Registro actualizado'))
    }
    else {
    this.heroeService.agregarHeroe(this.heroe)
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id])
        this.mostrarSnackBar('Registro creado')
      })
    }
    
  }

  borrar() {
    this.heroeService.borrarHeroe(this.heroe.id!)
    .subscribe( resp => {
      this.mostrarSnackBar('Registro borrado')
      this.router.navigate(['/heroes'])
    })
  }

  mostrarSnackBar (mensaje: string) {
    this.snackBar.open(mensaje, 'ok', {duration: 2500});
  }

}
