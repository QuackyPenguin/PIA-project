import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kupac } from '../models/kupac';
import { Preduzece } from '../models/preduzece';
import { Racun } from '../models/racun';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-kupac-pregled-racuna',
  templateUrl: './kupac-pregled-racuna.component.html',
  styleUrls: ['./kupac-pregled-racuna.component.css']
})
export class KupacPregledRacunaComponent implements OnInit {

  constructor(public router: Router, private preduzeceService: PreduzeceService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.kupac = JSON.parse(sessionStorage.getItem('kupac'))
    this.preduzeceService.svaPreduzeca().subscribe(res => {
      this.svaPreduzeca = res['svaPreduzeca']
      this.mojiRacuni = []
      this.svaPreduzeca.forEach(p => {
        if (p.racuni != null)
          p.racuni.forEach(r => {
            if (r.brojLK == this.kupac.brojLK)
              this.mojiRacuni.push({ racun: r, pred: p })
          })
      })

      for (let index = 0; index < 12; index++) {
        this.mesecnaPotrosnja[index] = 0

      }
      this.mojiRacuni.forEach(r => {
        if (new Date(r.racun.datum).getFullYear() == new Date().getFullYear())
          this.mesecnaPotrosnja[new Date(r.racun.datum).getMonth()] = +this.mesecnaPotrosnja[new Date(r.racun.datum).getMonth()] + +r.racun.cena
      })

      const tempA = [];

      for (let index = 0; index < this.mesecnaPotrosnja.length; index++) {
        tempA.push({
          name: new Date(2000, index, 2).toLocaleString('en-US', {
            month: 'long',
          }), value: this.mesecnaPotrosnja[index]
        })
      }
      this.grafikGodisnji = tempA

      for (let index = 0; index < 31; index++) {
        this.potrosnjaUMesecu[index] = 0

      }
      this.mojiRacuni.forEach(r => {
        if (new Date(r.racun.datum).getMonth() == new Date().getMonth())
          this.potrosnjaUMesecu[new Date(r.racun.datum).getDate()] = +this.potrosnjaUMesecu[new Date(r.racun.datum).getDate()] + +r.racun.cena
      })

      const tempB = [];

      for (let index = 0; index < this.potrosnjaUMesecu.length; index++) {
        tempB.push({
          name: index, value: this.potrosnjaUMesecu[index]
        })
      }
      this.grafikMesecni = tempB
    })
  }

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  boja: string = 'blue'
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Mesec';
  showYAxisLabel = true;
  yAxisLabel = 'Potrosnja';
  grafikGodisnji: {
    name: string;
    value: number;
  }[]
  grafikMesecni: {
    name: string;
    value: number;
  }[]

  kupac: Kupac
  prikazanRacun: Racun
  svaPreduzeca: Array<Preduzece>
  pregledaSe: boolean
  mojiRacuni: Array<any>
  mesecnaPotrosnja: number[] = []
  potrosnjaUMesecu: number[] = []


  prikazi(r: Racun) {
    if (this.pregledaSe) {
      this.prikazanRacun = r
    }
  }


}
