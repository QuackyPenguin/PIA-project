import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DodeliArtikalDialogComponent } from '../dodeli-artikal-dialog/dodeli-artikal-dialog.component';
import { Kategorija } from '../models/kategorija';
import { Potkategorija } from '../models/potkategorija';
import { Preduzece } from '../models/preduzece';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-raspored-artikala',
  templateUrl: './raspored-artikala.component.html',
  styleUrls: ['./raspored-artikala.component.css']
})
export class RasporedArtikalaComponent implements OnInit {

  constructor(private preduzeceService: PreduzeceService, private matDialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.pred = JSON.parse(sessionStorage.getItem('preduzece'))
    if (this.pred.kategorije == null) this.pred.kategorije = []
  }

  pred: Preduzece
  potK: Potkategorija
  novaK: string
  potkategorija: boolean
  natkategorija: Kategorija
  poruka: string

  dodajKat() {
    if (this.novaK != null && this.novaK != '' && (!this.potkategorija || this.natkategorija != null)) {
      this.poruka = 'Kategorija dodata'
      if (this.potkategorija) {
        this.pred.kategorije.forEach(k => {
          if (k.naziv == this.natkategorija.naziv) {
            let potk = new Potkategorija()
            potk.naziv = this.novaK
            potk.artikli = []
            k.kategorije.push(potk)
          }
        })
      } else {
        let k = new Kategorija()
        k.naziv = this.novaK
        k.kategorije = []
        this.pred.kategorije.push(k)
      }

      this.preduzeceService.sacuvajKategorije(this.pred.kor_ime, this.pred.kategorije).subscribe(res => {
        if (res['flag'] == 0) {
          sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
          this.novaK = ''
          this.potkategorija = false
        } else {
          alert('greska na serveru')
        }
      })
    } else {
      this.poruka = 'Morate popuniti sva polja'
    }
  }

  dialogDodela() {
    if (this.potK != null) {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.data = { potk: this.potK, artikli: this.pred.artikli }
      dialogConfig.disableClose = true
      let dialogRef = this.matDialog.open(DodeliArtikalDialogComponent, dialogConfig)

      dialogRef.afterClosed().subscribe(res => {
        if (res['flag'] == 1) {
          this.potK.artikli.push(res['artikal'])
          this.preduzeceService.sacuvajKategorije(this.pred.kor_ime, this.pred.kategorije).subscribe(res => {
            if (res['flag'] == 0) {
              sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
              this.novaK = ''
              this.potkategorija = false
              alert('artikal dodat potkategoriji')
            } else {
              alert('greska na serveru')
            }
          })
        }
      })
    }
  }

  
  povratak(){
    sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
    this.router.navigate(['preduzece'])
  }
}
