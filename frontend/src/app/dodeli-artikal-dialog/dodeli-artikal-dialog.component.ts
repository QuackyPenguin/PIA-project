import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Artikal } from '../models/artikal';

@Component({
  selector: 'app-dodeli-artikal-dialog',
  templateUrl: './dodeli-artikal-dialog.component.html',
  styleUrls: ['./dodeli-artikal-dialog.component.css']
})
export class DodeliArtikalDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DodeliArtikalDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.artikli = this.data['artikli']
    this.izabran = new Array(this.data['artikli'].length)
    this.vidljiv = new Array(this.data['artikli'].length)
    for (let i = 0; i < this.vidljiv.length; i++)
      this.vidljiv[i] = true

  }

  poruka: string

  potvrdi() {
    if (this.selektovan == null) this.poruka = 'Nijedan artikal nije selektovan'
    else {
      if (this.selektovan.pripada) this.poruka = 'Artikal ne moze pripadati 2 kategorije'
      else {
        this.selektovan.pripada = true
        this.dialogRef.close({ flag: 1, artikal: this.selektovan })
      }
    }
  }

  izaberiArtikal(i: number) {
    for (let j = 0; j < this.izabran.length; j++) {
      if (i == j) {
        this.izabran[j] = !this.izabran[j];
        if (this.izabran[j]) this.selektovan = this.data['artikli'][j]
        else this.selektovan = null
      }
      else {
        this.izabran[j] = false
      }
    }
  }

  izabran: Array<Boolean> = []
  selektovan: Artikal
  vidljiv: Array<Boolean>
  artikli: Array<Artikal>

  odustani() {
    this.dialogRef.close({ flag: 0 })
  }


  filter() {
    if (this.tekstFilter != null && this.tekstFilter != '') {
      let x = new RegExp(this.tekstFilter.toLowerCase())
      this.artikli.forEach((a, i) => {
        if (x.test(a.naziv.toLowerCase())) {
          this.vidljiv[i] = true
        } else {
          this.vidljiv[i] = false
          if (this.izabran[i]) {
            this.izabran[i] = false
            this.selektovan = null
          }
        }
      })
    }
  }

  tekstFilter: string
}
