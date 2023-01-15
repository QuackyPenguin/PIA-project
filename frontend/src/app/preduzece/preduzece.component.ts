import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preduzece } from '../models/preduzece';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  constructor(public router: Router, private preduzeceService:PreduzeceService) { }

  ngOnInit(): void {
    this.pred = JSON.parse(sessionStorage.getItem('preduzece'))
    if (this.pred.odeljenja == null && this.pred.kategorija == 'ugostiteljski objekat') {
      this.pred.odeljenja = []
      sessionStorage.setItem('preduzece', JSON.stringify(this.pred))
    }
  }

  ime: string
  pred: Preduzece
  staraLozinka: string
  lozinka: string
  ponovljenaLozinka: string
  formatLozinkePoruka: string
  validacijaPoruka: string

  validacija() {
    if (this.staraLozinka != this.pred.lozinka) {
      this.validacijaPoruka = 'Pogresna stara lozinka'
      return false
    }

    let x = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?\/~_+\-=|]).{7,11}$/
    if (!x.test(this.lozinka)) {
      this.validacijaPoruka = 'Neispravan format lozinke'
      return false
    }

    if (this.lozinka != this.ponovljenaLozinka) {
      this.validacijaPoruka = 'Lozinka pogresno ponovljena'
      return false
    }

    this.validacijaPoruka=''
    return true
  }

  promenaLozinke() {
    if (this.validacija()) {
      this.pred.lozinka=this.lozinka
      this.preduzeceService.menjajLozinku(this.pred.kor_ime, this.lozinka).subscribe(res=>{
        if(res['flag']==0) this.validacijaPoruka='Promenjena lozinka'
        else alert('Greska na serveru')
        this.lozinka=this.staraLozinka=this.ponovljenaLozinka=''
      })
    }
  }

  proveraLozinke() {
    let x = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?\/~_+\-=|]).{7,11}$/
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

  odjaviSe(){
    sessionStorage.clear()
    this.router.navigate([''])
  }

}
