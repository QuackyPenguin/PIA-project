import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artikal } from '../models/artikal';
import { Kasa } from '../models/kasa';
import { Kupac } from '../models/kupac';
import { Preduzece } from '../models/preduzece';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css']
})
export class KupacComponent implements OnInit {

  constructor(private preduzeceService: PreduzeceService, public router:Router) { }

  ngOnInit(): void {
    this.kupac = JSON.parse(sessionStorage.getItem('kupac'))
    this.preduzeceService.svaPreduzeca().subscribe(res => {
      this.svaPreduzeca = res['svaPreduzeca']
    })
  }

  svaPreduzeca: Array<Preduzece>
  kupac: Kupac
  art: Artikal
  izabranoPreduzece: Preduzece
  tekstFilter: string
  nevidljiv: Array<Boolean>

  promenaPreduzeca() {
    if (this.izabranoPreduzece) {
      this.nevidljiv = new Array(this.izabranoPreduzece.artikli.length)
    }
  }

  filter() {
    if (this.tekstFilter != null && this.tekstFilter != '') {
      let x = new RegExp(this.tekstFilter.toLowerCase())
      this.izabranoPreduzece.artikli.forEach((a, i) => {
        if (x.test(a.naziv.toLowerCase())) {
          this.nevidljiv[i] = false
        }
        else this.nevidljiv[i] = true
      })
    }
    else
      this.nevidljiv = new Array(this.izabranoPreduzece.artikli.length)

  }

  minCena(a:Artikal){
    let min=Number.MAX_SAFE_INTEGER
    this.izabranoPreduzece.kase.forEach((k)=>{
      k.artikli.forEach(na=>{
        if(na.art.naziv==a.naziv&&na.prodajna_cena_rsd<min) min=na.prodajna_cena_rsd
      })
    })
  if(min==Number.MAX_SAFE_INTEGER) return '---'
  return min
  }

  prodajniObjekti(a){
    let x=new Array<Kasa>()
    this.izabranoPreduzece.kase.forEach((k)=>{
      k.artikli.forEach(na=>{
        if(na.art.naziv==a.naziv) x.push(k)
      })
    })
    return x
  }

  odjaviSe(){
    sessionStorage.clear()
    this.router.navigate([''])
  }
}
