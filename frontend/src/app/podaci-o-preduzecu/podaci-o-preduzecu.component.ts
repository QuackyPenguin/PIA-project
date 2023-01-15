import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Delatnost } from '../models/delatnost';
import { Kasa } from '../models/kasa';
import { KasaM } from '../models/kasaM';
import { Magacin } from '../models/magacin';
import { Preduzece } from '../models/preduzece';
import { ZiroRacun } from '../models/ziro_racun';
import { KasaService } from '../services/kasa.service';
import { PreduzeceService } from '../services/preduzece.service';
import { SifrarnikService } from '../services/sifrarnik.service';

@Component({
  selector: 'app-podaci-o-preduzecu',
  templateUrl: './podaci-o-preduzecu.component.html',
  styleUrls: ['./podaci-o-preduzecu.component.css']
})
export class PodaciOPreduzecuComponent implements OnInit {

  constructor(private preduzeceService: PreduzeceService, private sifrarnikService: SifrarnikService,
    private kasaService: KasaService, public router: Router) { }

  pred: Preduzece

  sveSifre: Array<Delatnost>

  menjajOdg: boolean
  menjajImejl: boolean
  menjajTel: boolean

  poruka: string

  ngOnInit(): void {
    this.pred = JSON.parse(sessionStorage.getItem('preduzece'))
    this.sifrarnikService.sveSifre().subscribe(res => {
      this.sveSifre = res['sifre']
    })
    this.kasaService.sveKase().subscribe(res => {
      this.sveKase = res['kase']
    })
  }

  sveKase: Array<KasaM>

  promeni(p, menjaj) {
    if (menjaj) {
      this.preduzeceService.promenaPodataka(this.pred).subscribe(res => {
        if (res['flag'] == -1) {
          this.poruka = ""
          alert('Greska na serveru')
        }
        else {
          this.poruka = 'Izmena izvrsena za ' + p
          sessionStorage.removeItem('preduzece')
          sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
        }
      })
    } else {
      this.poruka = ''
    }
  }

  poredi(o1, o2) {
    return o1.sifra == o2.sifra
  }

  ziro_racun: ZiroRacun = new ZiroRacun()
  ziro_racun_za_brisanje: ZiroRacun
  ziroGreska:string

  dodajRacun() {
    if (this.ziro_racun.broj_racuna == null || this.ziro_racun.broj_racuna == '' ||
      this.ziro_racun.naziv_banke == null || this.ziro_racun.naziv_banke == '' ||
      !/^[0-9]{3}-[0-9]{12}-[0-9]{3}$/.test(this.ziro_racun.broj_racuna)) {
      this.ziroGreska = 'Unesite ispravne podatke'
      return
    }
  this.ziroGreska=''
    this.pred.ziro_racuni.push(this.ziro_racun)
    this.ziro_racun = new ZiroRacun();

    this.promena()
  }

  brisiRacun() {
    this.pred.ziro_racuni.splice(this.pred.ziro_racuni.indexOf(this.ziro_racun_za_brisanje), 1)
    this.promena()
  }

  magacin: Magacin = new Magacin()
  magacin_za_brisanje: Magacin
  magacinGreska:string

  dodajMagacin() {
    if (this.magacin.naziv == null || this.magacin.naziv == '' || this.magacin.id == null || this.magacin.id == '') {
      this.magacinGreska = 'Unesite ispravne podatke'
      return
    }
  this.magacinGreska=''
    this.pred.magacini.push(this.magacin)
    this.magacin = new Magacin();
    this.promena()
  }

  brisiMagacin() {
    this.pred.magacini.splice(this.pred.magacini.indexOf(this.magacin_za_brisanje), 1)
    this.promena()
  }

  kasa: Kasa = new Kasa()
  kasa_za_brisanje: Kasa
  kasaGreska:string

  dodajKasa() {
    if (this.kasa.lokacija == null || this.kasa.lokacija == '') {
      this.kasaGreska = 'Unesite ispravne podatke'
      return
    }
    this.kasaGreska=''
    this.pred.kase.push(this.kasa)
    this.kasa = new Kasa();
    this.promena()
  }

  brisiKasa() {
    this.pred.kase.splice(this.pred.kase.indexOf(this.kasa_za_brisanje), 1)
    this.promena()
  }

  promena() {
    this.preduzeceService.promenaPodataka(this.pred).subscribe(res => {
      if (res['flag'] == -1)
        alert('Greska na serveru')
      else {
        sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
      }
    })
  }

  povratak(){
    sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
    this.router.navigate(['preduzece'])
  }
}
