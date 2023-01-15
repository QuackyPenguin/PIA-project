import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { Narucilac } from '../models/narucilac';
import { Preduzece } from '../models/preduzece';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-narucioci',
  templateUrl: './narucioci.component.html',
  styleUrls: ['./narucioci.component.css']
})
export class NaruciociComponent implements OnInit {

  constructor(private preduzeceService: PreduzeceService, private domSanitizer: DomSanitizer, private router:Router) { }

  ngOnInit(): void {
    this.pred = JSON.parse(sessionStorage.getItem('preduzece'))
    this.preduzeceService.svaPreduzeca().subscribe(res => {
      this.svaPreduzeca = res['svaPreduzeca']
    })
  }

  pred: Preduzece
  svaPreduzeca: Array<Preduzece>

  odgovorno_lice: string=''
  kor_ime: string=''
  lozinka: string=''
  ponovljenaLozinka: string=''
  telefon: string=''
  imejl: string=''
  naziv: string=''
  drzava: string=''
  grad: string=''
  postanski_broj: number
  ulica: string=''
  broj: string=''
  pib: string=''
  maticni: number

  broj_dana: number = 15
  procenat_rabata: number = 10

  porukaDodato: string
  validacijaPoruka: string

  validacija() {
    if (this.odgovorno_lice == '' || this.kor_ime == '' || this.lozinka == '' || this.ponovljenaLozinka == '' || this.telefon == '' ||
      this.imejl == '' || this.naziv == '' || this.drzava == '' || this.grad == '' || this.postanski_broj == 0 || this.ulica == '' || this.broj == ''
      || this.pib == '' || this.maticni == 0) {
      this.validacijaPoruka = 'Svi podaci suobavezni'
      return false
    }

    if (this.slikaSacuvana == false) {
      this.validacijaPoruka = 'Slika je obavezna'
      return false
    }

    let x = /^[a-zA-Z](?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?\/~_+\-=|]).{7,11}$/

    if (!x.test(this.lozinka)) {
      this.validacijaPoruka = 'Los format lozinke'
      return false
    }

    if (this.lozinka != this.ponovljenaLozinka) {
      this.validacijaPoruka = 'Lozinke moraju biti iste'
      return false
    }

    x = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!x.test(this.imejl)) {
      this.validacijaPoruka = 'Los format maila'
      return false
    }

    if (!/^[1-9][0-9]{8}$/.test(this.pib)) {
      this.validacijaPoruka = 'Neispravan format PIB-a'
      return false
    }
    this.validacijaPoruka = ''
    return true
  }

  dodajNovog() {
    if (this.validacija())
      this.preduzeceService.registracija(this.odgovorno_lice, this.kor_ime, this.lozinka, this.telefon, this.imejl,
        this.naziv, this.drzava, this.grad, this.postanski_broj,
        this.ulica, this.broj, this.pib, this.maticni, 3, this.slika).subscribe((res) => {
          if (res['flag'] != -1) {
            let n = new Narucilac()
            n.PIB = this.pib
            n.broj_dana = this.broj_dana
            n.naziv = this.naziv
            n.procenat_rabata = this.procenat_rabata
            this.preduzeceService.dodajNarucioca(this.pred.kor_ime, n).subscribe(res => {
              if (res['flag'] == 0) {
                this.pred.narucioci.push(n);
                sessionStorage.removeItem('preduzece')
                sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
                this.porukaDodato = "Dodat novi narucilac"
              } else alert('Greska na serveru')
            })
          }
          else alert('Greska na serveru')

        })
  }

  formatLozinkePoruka: string

  proveraLozinke() {
    let x = /^[a-zA-Z](?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?\/~_+\-=|]).{7,11}$/
    if (x.test(this.lozinka)) this.formatLozinkePoruka = ''
    else this.formatLozinkePoruka = 'Neispravan format lozinke'
  }

  proveraPonovljeneLozinke() {
    if (this.lozinka == this.ponovljenaLozinka) {
      document.getElementById('proveraLozinkePoruka').style.color = 'green';
      document.getElementById('proveraLozinkePoruka').innerHTML = 'Lozinke su iste  ';
    }
    else {
      document.getElementById('proveraLozinkePoruka').style.color = 'red';
      document.getElementById('proveraLozinkePoruka').innerHTML = 'Lozinke nisu iste';
    }
  }

  nadjeni: Array<Preduzece> = []
  narucilac: Preduzece
  unetiPIB: string

  pretrazi() {
    let trazeniPIB = new RegExp(this.unetiPIB)
    this.nadjeni = []

    this.svaPreduzeca.forEach(p => {
      if (trazeniPIB.test(p.pib.toString()))
        this.nadjeni.push(p)
    })
  }

  dodajPostojeceg() {
    let n = new Narucilac()
    n.PIB = this.narucilac.pib
    n.broj_dana = this.broj_dana
    n.naziv = this.narucilac.naziv
    n.procenat_rabata = this.procenat_rabata
    this.preduzeceService.dodajNarucioca(this.pred.kor_ime, n).subscribe(res => {
      if (res['flag'] == 0) {
        this.pred.narucioci.push(n);
        sessionStorage.removeItem('preduzece')
        sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
        this.porukaDodato = "Dodat novi narucilac"
      }
      else alert('Greska na serveru')
    })
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
      const min_height = 300;
      const min_width = 300;

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

  putdoslike() {
    return this.domSanitizer.bypassSecurityTrustUrl(this.slika)
  }

  
  povratak(){
    sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
    this.router.navigate(['preduzece'])
  }
}

