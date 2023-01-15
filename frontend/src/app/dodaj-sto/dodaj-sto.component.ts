import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sto } from '../models/sto';
import { RasporedStolovaComponent } from '../raspored-stolova/raspored-stolova.component';

@Component({
  selector: 'app-dodaj-sto',
  templateUrl: './dodaj-sto.component.html',
  styleUrls: ['./dodaj-sto.component.css']
})
export class DodajStoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RasporedStolovaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.sto = new Sto()
  }

  sto: Sto
  poruka: string

  potvrdi() {
    if (this.sto.tip == null || this.sto.id == null || this.sto.id == '') {
      this.poruka = 'Morate popuniti sva polja'
      return
    }
    if ((this.sto.tip == 'krug' && this.sto.r == 0) || (this.sto.tip != 'krug' && (this.sto.h == 0 || this.sto.w == 0))) {
      this.poruka = 'Dimenzije ne mogu biti 0'
      return
    }
    if (this.sto.tip == 'krug') this.sto.h = this.sto.w = this.sto.r
    this.sto.x = this.sto.y = 1
    this.dialogRef.close({ flag: 1, sto: this.sto })
  }

  odustani() {
    this.dialogRef.close({ flag: 0 })
  }

}
