import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preduzece } from '../models/preduzece';
import { Racun } from '../models/racun';

@Component({
  selector: 'app-pregled-izvestaja',
  templateUrl: './pregled-izvestaja.component.html',
  styleUrls: ['./pregled-izvestaja.component.css']
})
export class PregledIzvestajaComponent implements OnInit {

  constructor(private datePipe: DatePipe, private router:Router) { }

  ngOnInit(): void {
    this.pred = JSON.parse(sessionStorage.getItem('preduzece'))
    if (this.pred.racuni == null) {
      this.pred.racuni = []
      sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
    }
  }

  pred: Preduzece
  datum: string
  poruka: string

  dnevniPazar() {
    let x = new RegExp("^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$")
    if (x.test(this.datum.trim())) {
      let racuni = this.pred.racuni
      let pdv = 0
      let promet = 0

      racuni.forEach(r => {
        if (this.datePipe.transform(this.datum, 'yyyy-MM-dd') == this.datePipe.transform(r.datum, 'yyyy-MM-dd')) {
          promet = +promet + +r.cena;
          r.stavke.forEach(s => {
            pdv = +pdv + +s.porez
          })
        }
      })
      this.poruka = 'Dnevni pazar je ' + promet + 'RSD, a od toga PDV ' + pdv + 'RSD'
    } else {
      this.poruka = 'Datum mora biti formata yyyy-mm-dd, a takodje i postojeci '
    }
  }

  racun:Racun

  
  povratak(){
    sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
    this.router.navigate(['preduzece'])
  }

}
