import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BrisiDialogComponent } from '../brisi-dialog/brisi-dialog.component';
import { Artikal } from '../models/artikal';
import { NabavniArtikal } from '../models/nabavni_artikal';
import { Preduzece } from '../models/preduzece';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-robe-i-usluge',
  templateUrl: './robe-i-usluge.component.html',
  styleUrls: ['./robe-i-usluge.component.css']
})
export class RobeIUslugeComponent implements OnInit {

  constructor(private _change: ChangeDetectorRef, private preduzeceService: PreduzeceService, private router: Router,
    private matDialog: MatDialog, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.pred = JSON.parse(sessionStorage.getItem('preduzece'))
    this.dataSource = new MatTableDataSource<any>(this.pred.artikli)
    this._change.detectChanges()
    this.dataSource.paginator = this.paginator
    this.dataObs$ = this.dataSource.connect()
    this.selected = new Array(this.pred.artikli.length)
    if (this.pred.artikli == null) this.pred.artikli = []
  }

  dataSource: MatTableDataSource<any>
  selected: Array<boolean>
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  dataObs$: Observable<any>

  pred: Preduzece
  omogucenUnos: boolean
  art: Artikal
  izabran: boolean = false

  omoguciUnos() {
    this.art = new Artikal(null)
    this.art.stopa_poreza = this.pred.PDVsistem ? 10 : 10
    this.nabavni = new Array(this.pred.magacini.length)
    this.nabavniK = new Array(this.pred.kase.length)
    this.pred.magacini.forEach((m, i) => {
      if (m.artikli == null) m.artikli = []
      this.nabavni[i] = new NabavniArtikal(null)
    })
    this.pred.kase.forEach((m, i) => {
      if (m.artikli == null) m.artikli = []
      this.nabavniK[i] = new NabavniArtikal(null)
    })
    this.unesi = new Array(this.pred.magacini.length)
    this.unesiK = new Array(this.pred.kase.length)
    this.omogucenUnos = true
  }

  izmena: boolean
  dialogOpcija: string

  omoguciIzmenu() {
    this.izmena = true;
    this.omoguciUnos()
    this.selected.forEach((v, i) => {
      if (v) {
        this.art = new Artikal(this.pred.artikli[i])
        this.pred.magacini.forEach((m, j) => {
          m.artikli.forEach(a => {
            if (a.art.naziv == this.art.naziv) {
              this.nabavni[j] = new NabavniArtikal(a)
              this.unesi[j] = true
            }
          })
        })
        this.pred.kase.forEach((m, j) => {
          m.artikli.forEach(a => {
            if (a.art.naziv == this.art.naziv) {
              this.nabavniK[j] = new NabavniArtikal(a)
              this.unesiK[j] = true
            }
          })
        })
      }
    })
  }

  brisiDialog() {
    let naziv = ''
    this.selected.forEach((s, i) => {
      if (s) {
        naziv = this.pred.artikli[i].naziv
      }
    })
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = naziv
    dialogConfig.disableClose = true
    let dialogRef = this.matDialog.open(BrisiDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(res => {
      if (res == 1) this.brisi()
    })
  }

  brisi() {
    this.selected.forEach((s, i) => {
      if (s) {
        this.pred.magacini.forEach((m) => {
          m.artikli.forEach((a, j) => {
            if (a.art.naziv == this.pred.artikli[i].naziv) {
              m.artikli.splice(j, 1)
            }
          })
        })
        this.pred.artikli.splice(i, 1)
      }
    })

    this.preduzeceService.sacuvajArtikal(this.pred.kor_ime, this.pred.artikli,
      this.pred.magacini, this.pred.kase).subscribe(res => {
        if (res['flag'] == -1) alert('Greska na serveru')
        else {
          sessionStorage.removeItem('preduzece')
          sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
          this.dataSource = new MatTableDataSource<any>(this.pred.artikli)
          this._change.detectChanges()
          this.dataSource.paginator = this.paginator
          this.dataObs$ = this.dataSource.connect()
          this.selected = new Array(this.pred.artikli.length)
        }
      })
  }

  nabavni: Array<NabavniArtikal>
  unesi: Array<boolean>
  nabavniK: Array<NabavniArtikal>
  unesiK: Array<boolean>

  select(i) {
    for (let k = 0; k < this.selected.length; k++)
      if (k == i) {
        this.selected[k] = !this.selected[k]
        this.izabran = this.selected[k]
      }
      else this.selected[k] = false
  }

  promena() {
    this.selected = new Array(this.pred.delatnosti.length)
  }

  ispunjenaForma() {
    if (this.art.sifra == null || this.art.sifra == '' ||
      this.art.naziv == null || this.art.naziv == '' ||
      this.art.jedinica_mere == null || this.art.jedinica_mere == '' ||
      this.art.stopa_poreza == null) {
      this.unosGreska = 'Opsti podaci su obavezni'
      return false
    }
    let x = true
    this.pred.artikli.forEach(a => {
      if (a.sifra == this.art.sifra) {
        this.unosGreska = 'Sifra mora biti jedinstvena'
        x = false
      }
    })
    return x
  }

  potvrdiUnos() {
    if (this.ispunjenaForma()) {
      if (this.art.slika == null || this.art.slika == '') {
        if (this.slikaSacuvana) this.art.slika = this.slika
        else this.art.slika = 'data:image/jpeg;base64,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'
      }
      this.unosGreska = ''
      if (this.izmena) {
        this.pred.magacini.forEach((m) => {
          m.artikli.forEach((a, j) => {
            if (a.art.naziv == this.art.naziv) {
              m.artikli.splice(j, 1)
            }
          })
        })
        this.pred.artikli.forEach((a, i) => {
          if (a.naziv == this.art.naziv) {
            this.pred.artikli.splice(i, 1)
          }
        })

        this.selected.forEach(v =>
          v = false)
        this.izmena = false
        this.izabran = false
      }

      this.pred.magacini.forEach((m, i) => {
        if (this.unesi[i]) {
          this.nabavni[i].art = this.art
          this.pred.magacini[i].artikli.push(this.nabavni[i])
        }
      })
      this.pred.kase.forEach((m, i) => {
        if (this.unesiK[i]) {
          this.nabavniK[i].art = this.art
          this.pred.kase[i].artikli.push(this.nabavniK[i])
        }
      })
      this.omogucenUnos = false
      this.pred.artikli.push(this.art)

      this.preduzeceService.sacuvajArtikal(this.pred.kor_ime, this.pred.artikli, this.pred.magacini, this.pred.kase).subscribe(res => {
        if (res['flag'] == -1) alert('Greska na serveru')
        else {
          sessionStorage.removeItem('preduzece')
          sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
          this.dataSource = new MatTableDataSource<any>(this.pred.artikli)
          this._change.detectChanges()
          this.dataSource.paginator = this.paginator
          this.dataObs$ = this.dataSource.connect()
          this.selected = new Array(this.pred.artikli.length)
        }
      })
    }
  }

  unosGreska: string

  ponistiUnos() {
    this.izmena = false;
    this.omogucenUnos = false;
    this.unosGreska = ''
    this.slikaSacuvana = false
    this.slika = ''
  }


  slika: string
  slikaPoruka: string
  slikaSacuvana: boolean

  slikaDodata(fileInput: any) {
    this.slikaPoruka = null;
    this.slika = null
    this.slikaSacuvana = false
    if (fileInput.target.files && fileInput.target.files[0]) {

      const max_height = 300;
      const max_width = 300;
      const min_height = 100;
      const min_width = 100;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);


          if (img_height > max_height || img_width > max_width || img_height < min_height || img_width < min_width) {
            this.slikaPoruka = 'Nedozvoljene dimenzije'
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.slika = imgBase64Path;
            this.slikaSacuvana = true;
            return true
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  putdoslike(slika) {
    return this.domSanitizer.bypassSecurityTrustUrl(slika)
  }
  
  povratak(){
    sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
    this.router.navigate(['preduzece'])
  }
}
