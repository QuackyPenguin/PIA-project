import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KupacService } from '../services/kupac.service';

@Component({
  selector: 'app-admin-kupac-registracija',
  templateUrl: './admin-kupac-registracija.component.html',
  styleUrls: ['./admin-kupac-registracija.component.css']
})
export class AdminKupacRegistracijaComponent implements OnInit {

  constructor(public router: Router, private kupacService: KupacService) { }

  ngOnInit(): void {
  }

  kor_ime: string;
  lozinka: string;
  ime: string;
  prezime: string;
  telefon: string;
  brojLK: string;
  ponovljenaLozinka: string

  porukaRegistracija: string

  validacija() {
    if (this.kor_ime == '' || this.lozinka == '' || this.ponovljenaLozinka == '' || this.telefon == '' || this.brojLK == '') {
      this.validacijaPoruka = 'Svi podaci suobavezni'
      return false
    }

    let x = /^[a-zA-Z](?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?\/~_+\-=|]).{8,12}$/

    if (!x.test(this.lozinka)) {
      this.validacijaPoruka = 'Los format lozinke'
      return false
    }

    if (this.lozinka != this.ponovljenaLozinka) {
      this.validacijaPoruka = 'Lozinke moraju biti iste'
      return false
    }

    this.validacijaPoruka = ''
    return true
  }

  formatLozinkePoruka: string
  validacijaPoruka: string

  registracija() {
    if (this.validacija())
      this.kupacService.registracija(this.kor_ime, this.lozinka, this.ime, this.prezime, this.brojLK, this.telefon).subscribe((res) => {
        if (res['flag'] == 0) {
          this.porukaRegistracija = "Registracija uspesna"
        } else {
          this.porukaRegistracija = "Greska na serveru"
        }
      })
  }


  proveraLozinke() {
    let x = /^[a-zA-Z](?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?\/~_+\-=|]).{8,12}$/
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

}
