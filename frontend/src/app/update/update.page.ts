import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PilotoService } from './../services/piloto.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  updatePilotoFg: FormGroup;
  id: any;

  constructor(
    private pilotoService: PilotoService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchPiloto(this.id);
    this.updatePilotoFg = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      escuderia: [''],
      numero: [''],
    });
  }

  fetchPiloto(id) {
    this.pilotoService.getPiloto(id).subscribe((data) => {
      this.updatePilotoFg.setValue({
        nombre: data['nombre'],
        apellido: data['apellido'],
        escuderia: data['escuderia'],
        numero: data['numero'],
      });
    });
  }

  onSubmit() {
    if (!this.updatePilotoFg.valid) {
      return false;
    } else {
      this.pilotoService
        .updatePiloto(this.id, this.updatePilotoFg.value)
        .subscribe(() => {
          this.updatePilotoFg.reset();
          this.router.navigate(['/tabs/tab3']);
        });
    }
  }
}

//   constructor() { }

//   ngOnInit() {
//   }

// }
