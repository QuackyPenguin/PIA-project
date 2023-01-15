import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preduzece } from '../models/preduzece';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-pregled-dnevnih-izvestaja',
  templateUrl: './pregled-dnevnih-izvestaja.component.html',
  styleUrls: ['./pregled-dnevnih-izvestaja.component.css']
})
export class PregledDnevnihIzvestajaComponent implements OnInit {

  constructor(private preduzeceService: PreduzeceService, private datePipe: DatePipe, public router:Router) { }

  ngOnInit(): void {
    this.preduzeceService.svaPreduzeca().subscribe(res => {
      this.svaPreduzeca = res['svaPreduzeca']
    })
  }

  svaPreduzeca: Array<Preduzece>
  datumOd: string
  datumDo: string
  naziv: string
  pib: string
  pregled: boolean
  prikaz: Array<any>
  poruka: string

  izvestaji() {
    let x = new RegExp("^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$")
    if (this.datumOd == null || this.datumDo == null || !x.test(this.datumDo) || !x.test(this.datumOd)) {
      this.poruka = 'Neispravan unos datuma'
    } else {
      this.pregled = true
      let nekaPreduzeca1 = new Array<Preduzece>()
      if (this.naziv && this.naziv != '') {
        x = new RegExp(this.naziv)
        this.svaPreduzeca.forEach(p => {
          if (x.test(p.naziv)) nekaPreduzeca1.push(p)
        })
      } else {
        nekaPreduzeca1 = this.svaPreduzeca
      }
      let nekaPreduzeca2 = new Array<Preduzece>()
      if (this.pib && this.pib != '') {
        x = new RegExp(this.pib)
        nekaPreduzeca1.forEach(p => {
          if (x.test(p.pib)) nekaPreduzeca2.push(p)
        })
      } else {
        nekaPreduzeca2 = nekaPreduzeca1
      }

      this.prikaz = []

      nekaPreduzeca2.forEach(p => {
        let racuni = p.racuni
        let pdv = 0
        let promet = 0

        racuni.forEach(r => {
          if (this.datePipe.transform(this.datumOd, 'yyyy-MM-dd') <= this.datePipe.transform(r.datum, 'yyyy-MM-dd') &&
            this.datePipe.transform(this.datumDo, 'yyyy-MM-dd') >= this.datePipe.transform(r.datum, 'yyyy-MM-dd')) {
            promet = +promet + +r.cena;
            r.stavke.forEach(s => {
              pdv = +pdv + +s.porez
            })
          }
        })
        this.prikaz.push({ naziv: p.naziv, pib: p.pib, promet: promet, pdv: pdv })
      })
    }
  }
}
