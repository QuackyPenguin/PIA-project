import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preduzece } from '../models/preduzece';
import { KupacService } from '../services/kupac.service';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private preduzeceService: PreduzeceService, private router: Router, private kupacService: KupacService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.preduzeceService.svaPreduzeca().subscribe(res => {
      this.svaPreduzeca = res['svaPreduzeca']
      this.svaPreduzeca.forEach(p => {
        p.racuni.forEach(r => {
          let pdv = 0
          r.stavke.forEach(s => {
            pdv = +pdv + +s.porez
          })
          this.najnovijiRacuni.push({ naziv: p.naziv, racun: r, pdv: pdv })
        })
      })
      this.najnovijiRacuni.sort((a, b) => {
        if (this.datePipe.transform(a.racun.datum, 'yyyy-MM-dd') > this.datePipe.transform(b.racun.datum, 'yyyy-MM-dd'))
          return 1;
        if (this.datePipe.transform(a.racun.datum, 'yyyy-MM-dd') == this.datePipe.transform(b.racun.datum, 'yyyy-MM-dd'))
          return 0;
        return -1;
      })
    })
  }

  kor_ime: string
  lozinka: string
  poruka: string
  tip: string = "preduzece"
  svaPreduzeca: Array<Preduzece>
  najnovijiRacuni: Array<any> = []

  prijava() {
    if (this.tip == 'preduzece') this.prijavaPreduzece()
    else this.prijavaKupac()
  }

  prijavaKupac() {
    this.kupacService.prijava(this.kor_ime, this.lozinka).subscribe(res => {
      if (res['flag'] == -1) {
        this.poruka = "Greska na serveru"
        document.getElementById('poruka').style.color = "red"
      } else {
        if (res['flag'] == 0) {
          this.poruka = "Pogresno uneti podaci"
          document.getElementById('poruka').style.color = "red"
        } else {
          sessionStorage.setItem('kupac', JSON.stringify(res['kupac']))
          this.router.navigate(['kupac'])
        }
      }
    })
  }

  prijavaPreduzece() {
    this.preduzeceService.prijava(this.kor_ime, this.lozinka).subscribe(res => {
      switch (res['flag']) {
        case -1:
          this.poruka = "Greska na serveru"
          document.getElementById('poruka').style.color = "red"
          break;
        case 0:
          this.poruka = "Pogresno uneti podaci"
          document.getElementById('poruka').style.color = "red"
          break;
        case 1:
          sessionStorage.setItem('preduzece', JSON.stringify(res['preduzece']))
          this.router.navigate(['preduzece'])
          break;
        case 2:
          sessionStorage.setItem('preduzece', JSON.stringify(res['preduzece']))
          this.router.navigate(['preduzece-prvi-put'])
          break;
        case 3:
          this.poruka = "Registracija preduzeca ceka odobrenje"
          document.getElementById('poruka').style.color = "black"
          break;
        case 4:
          this.poruka = "Vase preduzece je trenutno deaktivirano"
          document.getElementById('poruka').style.color = "red"
          break;
      }
    })
  }

}
