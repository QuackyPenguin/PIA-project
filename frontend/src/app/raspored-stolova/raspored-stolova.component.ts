import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DodajStoComponent } from '../dodaj-sto/dodaj-sto.component';
import { Odeljenje } from '../models/odeljenje';
import { Preduzece } from '../models/preduzece';
import { Sto } from '../models/sto';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-raspored-stolova',
  templateUrl: './raspored-stolova.component.html',
  styleUrls: ['./raspored-stolova.component.css']
})

export class RasporedStolovaComponent implements OnInit {

  constructor(private router: Router, private matDialog: MatDialog, private preduzeceService: PreduzeceService) { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')
    this.pred = JSON.parse(sessionStorage.getItem('preduzece'))
    if (this.pred.odeljenja == null || this.pred.odeljenja.length==0) {
      this.pred.odeljenja = []
      sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
    }
    else {
      this.elementi = this.pred.odeljenja[0].stolovi
      this.izabrani = new Array(this.pred.odeljenja.length)
      this.izabrani[0] = true
      this.naziv = this.pred.odeljenja[0].naziv
      console.log(this.naziv)
      this.crtajElemente()
    }
  }

  promenaOdeljenja() {
    let i = 0
    this.pred.odeljenja.forEach((o, j) => {
      if (o.naziv == this.naziv)
        i = j;
    })
    this.indexIzabranogOdeljenja = i
    this.elementi = this.pred.odeljenja[i].stolovi
    this.izabrani = new Array(this.pred.odeljenja.length)
    this.izabrani[i] = true
    this.crtajElemente()
  }

  pred: Preduzece
  ctx: CanvasRenderingContext2D
  indexIzabranogOdeljenja: number = 0;
  izabrani: Array<boolean>
  naziv: string

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>

  pocniKretanje(event: MouseEvent) {
    let x = event.clientX - this.ctx.canvas.getBoundingClientRect().left
    let y = event.clientY - this.ctx.canvas.getBoundingClientRect().top
    this.elementi.forEach((s, i) => {
      if (s.x < x && s.x + s.w > x && s.y < y && s.y + s.h > y) {
        this.indexPomeranogStola = i
        this.staroX = s.x
        this.kretanjeUToku = true
        this.staroY = s.y
        this.crtajSto(s)
      }
    })
  }

  dodajSto() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    let dialogRef = this.matDialog.open(DodajStoComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(res => {
      if (res['flag'] == 1) {
        this.pred.odeljenja[this.indexIzabranogOdeljenja].stolovi.push(res['sto'])
        this.elementi = this.pred.odeljenja[this.indexIzabranogOdeljenja].stolovi
        this.preduzeceService.sacuvajOdeljenja(this.pred.kor_ime, this.pred.odeljenja).subscribe(res => {
          this.crtajElemente()
          sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
        })
      }
    })
  }

  crtajElemente() {

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.elementi.forEach(s => {
      this.crtajSto(s)
    })
  }

  kreciSe(event: MouseEvent) {
    if (this.kretanjeUToku) {
      let x = event.clientX - this.ctx.canvas.getBoundingClientRect().left
      let y = event.clientY - this.ctx.canvas.getBoundingClientRect().top
      this.elementi[this.indexPomeranogStola].x = x
      this.elementi[this.indexPomeranogStola].y = y
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      this.crtajElemente()
    }
  }

  zaustaviKretanje(event: MouseEvent) {
    if (this.kretanjeUToku) {
      this.kretanjeUToku = false;
      this.elementi.forEach((s, i) => {
        if (i != this.indexPomeranogStola) {
          if (this.doOverlap(
            { x: s.x + s.h, y: s.y + s.w },
            { x: s.x, y: s.y },
            {
              x: this.elementi[this.indexPomeranogStola].x + this.elementi[this.indexPomeranogStola].w,
              y: this.elementi[this.indexPomeranogStola].y + this.elementi[this.indexPomeranogStola].h
            },
            { x: this.elementi[this.indexPomeranogStola].x, y: this.elementi[this.indexPomeranogStola].y },
          )) {

            this.elementi[this.indexPomeranogStola].x = this.staroX
            this.elementi[this.indexPomeranogStola].y = this.staroY
          }
        }
      })
      this.indexPomeranogStola = -1;
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      this.preduzeceService.sacuvajOdeljenja(this.pred.kor_ime, this.pred.odeljenja).subscribe(res => {

      })
      sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
      this.crtajElemente()
    }
  }

  kretanjeUToku: boolean
  indexPomeranogStola: number
  staroX: number
  staroY: number

  crtajSto(s: Sto) {
    if (this.kretanjeUToku && s == this.elementi[this.indexPomeranogStola])
      this.ctx.strokeStyle = '#0000ff'
    else this.ctx.strokeStyle = '#000000'

    if (s.tip == 'kvadrat') {
      this.ctx.beginPath()
      this.ctx.rect(s.x, s.y, s.w, s.h)
      this.ctx.fillStyle = 'bisque'
      this.ctx.fillRect(s.x + 1, s.y + 1, s.w - 2, s.h - 2)
      this.ctx.fillStyle = 'black'
      this.ctx.fillText(s.id, s.x + 3, s.y + 10)
      this.ctx.stroke()
    } else {
      this.ctx.beginPath()
      this.ctx.arc(s.x + s.r / 2, s.y + s.r / 2, s.r / 2, 0, 2 * Math.PI)
      this.ctx.fillStyle = 'bisque'
      this.ctx.fill()
      this.ctx.lineWidth = 2
      this.ctx.fillStyle = 'black'
      this.ctx.fillText(s.id, s.x + 1, s.y + 5)
      this.ctx.stroke()
    }
  }

  elementi: Sto[]


  doOverlap(l1, r1, l2, r2) {
    console.log(l1.x + ' ' + r1.x + ' ' + l2.x + ' ' + r2.x)
    // if rectangle has area 0, no overlap

    // If one rectangle is on left side of other
    if (l1.x < r2.x || l2.x < r1.x)
      return false;

    // If one rectangle is above other
    if (r1.y > l2.y || r2.y > l1.y)
      return false;

    return true;
  }

  dodavanjeOdeljenja: boolean

  dodajOdeljenje() {
    this.dodavanjeOdeljenja = true
  }

  novoOdeljenje: string
  lokacijaNovog: string

  ponistiOdeljenje() {
    this.dodavanjeOdeljenja = false
  }

  poruka:string

  potvrdiOdeljenje() {
    if(this.novoOdeljenje==null||this.novoOdeljenje==''||this.lokacijaNovog==null||this.lokacijaNovog==''){
      this.poruka='Morate popuniti sva polja'
      return
    } 
    this.poruka=''
    this.dodavanjeOdeljenja = false
    let o = new Odeljenje()
    o.naziv = this.novoOdeljenje
    o.lokacija = this.lokacijaNovog
    o.stolovi = []
    this.pred.odeljenja.push(o)

    this.preduzeceService.sacuvajOdeljenja(this.pred.kor_ime, this.pred.odeljenja).subscribe(res => {
      sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
    })
  }

  
  povratak(){
    sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
    this.router.navigate(['preduzece'])
  }

}
