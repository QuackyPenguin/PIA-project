import { FactoryTarget } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Preduzece } from '../models/preduzece';
import { PreduzeceService } from '../services/preduzece.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private preduzeceService: PreduzeceService, private domSanitizer: DomSanitizer, public router:Router) { }

  ngOnInit(): void {

  }

  odgovorno_lice: string = ''
  kor_ime: string = ''
  lozinka: string = ''
  ponovljenaLozinka: string = ''
  telefon: string = ''
  imejl: string = ''
  naziv: string = ''
  drzava: string = ''
  grad: string = ''
  postanski_broj: number
  ulica: string = ''
  broj: string = ''
  pib: string = ''
  maticni: number

  validacija() {
    if (this.odgovorno_lice == '' || this.kor_ime == '' || this.lozinka == '' || this.ponovljenaLozinka == '' || this.telefon == '' ||
      this.imejl == '' || this.naziv == '' || this.drzava == '' || this.grad == '' || this.postanski_broj == 0 || this.ulica == '' || this.broj == ''
      || this.pib == '' || this.maticni == 0) {
      this.validacijaPoruka = 'Svi podaci su obavezni'
      return false
    }

    if (this.slikaSacuvana == false) {
      this.validacijaPoruka = 'Slika je obavezna'
      return false
    }

    let x = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?\/~_+\-=|]).{7,11}$/

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


  porukaRegistracija: string

  registracija() {

    if (this.validacija())
      this.preduzeceService.registracija(this.odgovorno_lice, this.kor_ime, this.lozinka, this.telefon, this.imejl,
        this.naziv, this.drzava, this.grad, this.postanski_broj, this.ulica,
        this.broj, this.pib, this.maticni, 3, this.slika).subscribe((res) => {
          switch (res['flag']) {
            case 0: this.porukaRegistracija = "Zahtev za registraciju ceka odobrenje"; break;
            case 1: this.porukaRegistracija = "Neuspesna registracija"; break;
            case 2: this.porukaRegistracija = "PIB, imejl i korisnicko ime moraju biti jedinstveni"; break;
          }
          if (res['flag'] == 0) {

          } else {
          }
        })

  }

  formatLozinkePoruka: string
  validacijaPoruka: string

  proveraLozinke() {
    let x = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?\/~_+\-=|]).{8,12}$/
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

  slika: string
  slikaPoruka: string
  slikaSacuvana: boolean=false

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
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  putdoslike() {
    return this.domSanitizer.bypassSecurityTrustUrl(this.slika)
  }
}
