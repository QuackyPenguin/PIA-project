import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Artikal } from '../models/artikal';
import { Kasa } from '../models/kasa';
import { Magacin } from '../models/magacin';
import { NabavniArtikal } from '../models/nabavni_artikal';
import { Odeljenje } from '../models/odeljenje';
import { Preduzece } from '../models/preduzece';
import { Racun } from '../models/racun';
import { Stavka } from '../models/stavka';
import { Sto } from '../models/sto';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-izdavanje-racuna',
  templateUrl: './izdavanje-racuna.component.html',
  styleUrls: ['./izdavanje-racuna.component.css']
})
export class IzdavanjeRacunaComponent implements OnInit {

  constructor(private preduzeceService: PreduzeceService, private router: Router) { }

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>

  ngOnInit(): void {
    this.pred = JSON.parse(sessionStorage.getItem('preduzece'))
    console.log(this.pred.kase.length)
    if (this.pred.racuni == null) {
      this.pred.racuni = []
      sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
    }
    if (this.pred.kategorija == 'ugostiteljski objekat') {
      this.ctx = this.canvas.nativeElement.getContext('2d')
      this.pred = JSON.parse(sessionStorage.getItem('preduzece'))
      if (this.pred.odeljenja == null || this.pred.odeljenja.length == 0) {
        this.pred.odeljenja = []
        sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
      }
      this.elementi = this.pred.odeljenja[0].stolovi
      this.izabrani = new Array(this.pred.odeljenja.length)
      this.izabrani[0] = true
      this.naziv = this.pred.odeljenja[0].naziv
      let o = this.pred.odeljenja[0]
      this.pred.kase.forEach(k => {
        if (o.lokacija == k.lokacija) {
          this.k = k
          this.artikli = k.artikli
          console.log(k.lokacija + ' ' + k.artikli.length)
        }
      })
      this.crtajElemente()
    }
  }

  elementi: Sto[]

  crtajElemente() {

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.elementi.forEach(s => {
      this.crtajSto(s)
    })
  }

  indexIzabranogStola: number = -1

  crtajSto(s: Sto) {

    if (this.indexIzabranogStola != -1 && this.elementi[this.indexIzabranogStola].id == s.id) this.ctx.strokeStyle = "blue"
    else this.ctx.strokeStyle = '#000000'

    if (s.tip == 'kvadrat') {
      this.ctx.beginPath()
      this.ctx.rect(s.x, s.y, s.w, s.h)
      this.ctx.fillStyle = 'bisque'
      this.ctx.fillRect(s.x + 1, s.y + 1, s.w - 2, s.h - 2)
      this.ctx.fillStyle = 'black'
      this.ctx.fillText(s.id, s.x + 3, s.y + 10)
      if (s.racun != null && s.racun.stavke != null && s.racun.stavke.length > 0) {
        console.log(s.id)
        this.ctx.fillStyle = 'red'
        this.ctx.fillText('ZAUZET', s.x + 3 + s.w / 10, s.y + 5 + s.h / 2)
      }
      this.ctx.stroke()
    } else {
      this.ctx.beginPath()
      this.ctx.arc(s.x + s.r / 2, s.y + s.r / 2, s.r / 2, 0, 2 * Math.PI, false)
      this.ctx.fillStyle = 'bisque'
      this.ctx.fill()
      this.ctx.lineWidth = 2
      this.ctx.fillStyle = 'black'
      this.ctx.fillText(s.id, s.x + 1, s.y + 5)
      if (s.racun != null) {
        this.ctx.fillStyle = 'red'
        this.ctx.fillText('ZAUZET', s.x + 3 + s.w / 10, s.y + 10 + s.h / 2)
      }
      this.ctx.stroke()
    }
  }


  ctx: CanvasRenderingContext2D
  indexIzabranogOdeljenja: number = 0;
  izabrani: Array<boolean>
  naziv: string
  pred: Preduzece
  racun: Racun
  objekat: string = 'magacin'
  m: Magacin
  k: Kasa
  nijeIzabrano: boolean = true
  artikli: Array<NabavniArtikal>

  potvrdiObjekat() {
    this.nijeIzabrano = false

    this.racun = new Racun()
    this.racun.stavke = []
    if (this.m) {
      this.racun.lokacija = this.m.naziv
      this.artikli = this.m.artikli
    } else {
      this.artikli = this.k.artikli
      this.racun.lokacija = this.k.lokacija
    }
    this.cena = 0
  }

  dodajeSe: boolean
  s: Stavka
  na: NabavniArtikal
  cena: number = 0

  dodavanjeStavke() {
    this.dodajeSe = true
    this.na = new NabavniArtikal(null)
    this.s = new Stavka()
  }

  poruka: string

  dodajStavku() {
    if (this.na.art == null || this.s.kolicina == 0 || this.s.kolicina == null) {
      this.poruka = 'Morate popuniti polja'
      console.log('mora')
      return
    }
    this.poruka = ''
    this.s.artikal = this.na.art
    this.s.osnovnaCena = this.na.prodajna_cena_rsd
    this.s.cena = this.s.kolicina * this.s.osnovnaCena
    this.s.porez = this.s.cena * (this.s.artikal.stopa_poreza / 100)
    this.racun.stavke.push(this.s)
    this.cena = +this.cena + +this.s.cena + +this.s.porez
    this.dodajeSe = false
  }

  ponistiStavku() {
    this.s = new Stavka()
    this.dodajeSe = false
  }

  zatvaranjeRacuna: boolean

  zatvoriRacun() {
    this.zatvaranjeRacuna = true
    this.racun.cena = this.cena
    this.kes = 0
  }

  odustaniOdRacuna() {
    this.poruka = ''
    this.nijeIzabrano = true
    this.cena = 0
    this.m = this.k = null
    this.objekat = null
    this.elementi[this.indexIzabranogStola].racun = new Racun()
    this.elementi[this.indexIzabranogStola].racun.stavke = []
    this.indexIzabranogStola = -1
    this.crtajElemente()
  }

  potvrdiZatvaranje() {
    this.racun.datum = new Date()
    this.pred.racuni.push(this.racun)
    this.preduzeceService.sacuvajRacune(this.pred.kor_ime, this.pred.racuni).subscribe(res => {
      this.nijeIzabrano = true
      this.zatvaranjeRacuna = false
      this.m = this.k = null
      this.objekat = 'kasa'
      this.elementi[this.indexIzabranogStola].racun = new Racun()
      this.elementi[this.indexIzabranogStola].racun.stavke = []
      sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
      this.cena = 0
      this.racun = null
      this.indexIzabranogStola = -1
      this.crtajElemente()
    })
  }

  ponistiZatvaranje() {
    this.zatvaranjeRacuna = false
    this.racun.brojLK = this.racun.brojSlip = null
    this.racun.cena = 0
    this.racun.ime = this.racun.nacin_placanja = this.racun.narucilac = this.racun.prezime = null
  }

  kes: number
  kusur: number

  promenaOdeljenja() {
    let i = 0
    this.objekat = 'kasa'
    this.pred.odeljenja.forEach((o, j) => {
      if (o.naziv == this.naziv) {
        i = j;
        this.pred.kase.forEach(k => {
          if (o.lokacija == k.lokacija) {
            this.k = k
            this.artikli = k.artikli
            console.log(k.lokacija + ' ' + k.artikli.length)
          }
        })
      }
    })
    if (this.indexIzabranogStola != -1 && this.elementi[this.indexIzabranogStola].racun.stavke.length == 0)
      this.elementi[this.indexIzabranogStola].racun = null
    this.indexIzabranogStola = -1
    this.indexIzabranogOdeljenja = i
    this.elementi = this.pred.odeljenja[i].stolovi
    this.izabrani = new Array(this.pred.odeljenja.length)
    this.izabrani[i] = true
    this.nijeIzabrano = true
    this.crtajElemente()
  }

  izaberiSto(event: MouseEvent) {
    let x = event.clientX - this.ctx.canvas.getBoundingClientRect().left
    let y = event.clientY - this.ctx.canvas.getBoundingClientRect().top
    this.elementi.forEach((s, i) => {
      if (s.x < x && s.x + s.w > x && s.y < y && s.y + s.h > y&&(this.nijeIzabrano||this.indexIzabranogStola==i)) {
        if (this.indexIzabranogStola == i) {
          this.indexIzabranogStola = -1
          this.nijeIzabrano = true
          if (s.racun.stavke.length == 0) s.racun = null
        }
        else {
          this.indexIzabranogStola = i
          this.nijeIzabrano = false
          if (s.racun == null) {
            s.racun = new Racun()
            s.racun.stavke = []
            s.racun.lokacija = this.k.lokacija
            this.racun = s.racun
          }
          else {
            this.racun = s.racun
          }
        }

        this.crtajSto(s)
      }
    })
  }


  povratak() {
    sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
    this.router.navigate(['preduzece'])
  }

}
