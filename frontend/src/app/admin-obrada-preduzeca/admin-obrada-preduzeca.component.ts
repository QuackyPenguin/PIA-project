import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preduzece } from '../models/preduzece';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-admin-obrada-preduzeca',
  templateUrl: './admin-obrada-preduzeca.component.html',
  styleUrls: ['./admin-obrada-preduzeca.component.css']
})
export class AdminObradaPreduzecaComponent implements OnInit {

  constructor(private preduzeceService: PreduzeceService, public router:Router) { }

  ngOnInit(): void {
    this.preduzeceService.svaPreduzeca().subscribe(res => {
      this.svaPreduzeca = res['svaPreduzeca']
    })
  }

  svaPreduzeca: Array<Preduzece> = []
  poruka: string

  deaktiviraj(kor_ime) {
    this.preduzeceService.promenaStatusa(kor_ime, 4).subscribe(res => {
      if (res['flag'] == -1) this.poruka = "Greska na serveru"
      this.ngOnInit()
    })
  }

  aktiviraj(kor_ime, kategorija) {
    let st=1
    if(kategorija==null) st=2
    this.preduzeceService.promenaStatusa(kor_ime, st).subscribe(res => {
      if (res['flag'] == -1) this.poruka = "Greska na serveru"
      this.ngOnInit()
    })
  }

  odobri(kor_ime) {
    this.preduzeceService.promenaStatusa(kor_ime, 2).subscribe(res => {
      if (res['flag'] == -1) this.poruka = "Greska na serveru"
      this.ngOnInit()
    })
  }

}
