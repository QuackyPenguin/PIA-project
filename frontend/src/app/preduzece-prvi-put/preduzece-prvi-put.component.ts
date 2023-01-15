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
  selector: 'app-preduzece-prvi-put',
  templateUrl: './preduzece-prvi-put.component.html',
  styleUrls: ['./preduzece-prvi-put.component.css']
})

export class PreduzecePrviPutComponent implements OnInit {

  constructor(private sifrarnikService: SifrarnikService, private preduzeceService: PreduzeceService,
    private kasaService: KasaService, private router: Router) { }

  ngOnInit(): void {
    this.sifrarnikService.sveSifre().subscribe((res) => {
      this.sveSifre = res['sifre']
    })
    this.kasaService.sveKase().subscribe((res) => {
      this.sveKase = res['kase']
    })
  }


  sveKase: Array<KasaM>
  kategorija: string
  sifre: Array<Delatnost> = []
  PDVsistem: boolean
  ziro_racuni: Array<ZiroRacun> = []
  magacini: Array<Magacin> = []
  kase: Array<Kasa> = []
  sveSifre: Array<Delatnost> = []
  ziro_racun: ZiroRacun = new ZiroRacun()
  ziro_racun_za_brisanje: ZiroRacun
  ziroGreska: string

  dodajRacun() {
    if (this.ziro_racun.broj_racuna == null || this.ziro_racun.broj_racuna == '' ||
      this.ziro_racun.naziv_banke == null || this.ziro_racun.naziv_banke == '' ||
      !/^[0-9]{3}-[0-9]{12}-[0-9]{3}$/.test(this.ziro_racun.broj_racuna)) {
      this.ziroGreska = 'Unesite ispravne podatke'
      return
    }
    this.ziroGreska = ''
    this.ziro_racuni.push(this.ziro_racun)
    this.ziro_racun = new ZiroRacun();
  }

  brisiRacun() {
    this.ziro_racuni.splice(this.ziro_racuni.indexOf(this.ziro_racun_za_brisanje), 1)
  }

  broj_magacina: number = 1
  zabranjen_unosM: boolean
  magacin: Magacin = new Magacin()
  magacin_za_brisanje: Magacin
  magacinGreska: string

  dodajMagacin() {
    if (this.magacin.naziv == null || this.magacin.naziv == '' || this.magacin.id == null || this.magacin.id == '') {
      this.magacinGreska = 'Unesite ispravne podatke'
      return
    }
    this.magacinGreska = ''
    this.magacini.push(this.magacin)
    this.magacin = new Magacin();
    this.dozvoljenUnosM();
  }

  brisiMagacin() {
    this.magacini.splice(this.magacini.indexOf(this.magacin_za_brisanje), 1)
    this.dozvoljenUnosM()
  }

  dozvoljenUnosM() {
    if (this.broj_magacina > this.magacini.length)
      this.zabranjen_unosM = false;
    else
      this.zabranjen_unosM = true;
  }

  broj_kasa: number = 1
  zabranjen_unosK: boolean
  kasa: Kasa = new Kasa()
  kasa_za_brisanje: Kasa
  kasaGreska: string

  dodajKasa() {
    if(this.kasa.lokacija==null||this.kasa.lokacija==''){
      this.kasaGreska='Unesite ispravne podatke'
      return
    }
    this.kasaGreska=''
    this.kase.push(this.kasa)
    this.kasa = new Kasa();
    this.dozvoljenUnosK();
  }

  brisiKasa() {
    this.kase.splice(this.kase.indexOf(this.kasa_za_brisanje), 1)
    this.dozvoljenUnosK()
  }

  dozvoljenUnosK() {
    if (this.broj_kasa > this.kase.length)
      this.zabranjen_unosK = false;
    else
      this.zabranjen_unosK = true;
  }

  p: Preduzece

  sacuvaj() {
    let pred = JSON.parse(sessionStorage.getItem('preduzece'))

    this.preduzeceService.sacuvajPodatke(pred.kor_ime, this.kategorija, this.sifre, this.PDVsistem,
      this.ziro_racuni, this.magacini, this.kase).subscribe((res) => {
        if (res['flag'] == -1)
          alert('Greska na serveru')
        else {
          this.p = pred;
          this.p.kategorija = this.kategorija
          this.p.PDVsistem = this.PDVsistem

          this.p.delatnosti = []
          this.sifre.forEach(s => {
            this.p.delatnosti.push(s)
          })

          this.p.ziro_racuni = []
          this.ziro_racuni.forEach(s => {
            this.p.ziro_racuni.push(s)
          })

          this.p.kase = []
          this.kase.forEach(s => {
            this.p.kase.push(s)
          })

          this.p.magacini = []
          this.magacini.forEach(s => {
            this.p.magacini.push(s)
          })

          sessionStorage.setItem('preduzece', JSON.stringify(pred))
          this.router.navigate(['preduzece'])
        }
      })
  }

}
