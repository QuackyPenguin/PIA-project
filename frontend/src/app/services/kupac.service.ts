import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KupacService {

  constructor(private httpService: HttpClient) {
    this.uri = 'http://localhost:4000'
  }

  uri: string

  prijava(kor_imeForma, lozinkaForma){
    const data={
      kor_ime:kor_imeForma,
      lozinka: lozinkaForma
    }

    return this.httpService.post(`${this.uri}/kupac/prijava`, data)
  }

  registracija(kor_imeForma, lozinkaForma, imeForma, prezimeForma, brojLKForma, telefonForma){
    const data={
      kor_ime:kor_imeForma,
      lozinka: lozinkaForma,
      ime: imeForma,
      prezime: prezimeForma,
      brojLK: brojLKForma,
      telefon: telefonForma
    }

    return this.httpService.post(`${this.uri}/kupac/registracija`, data)
  }
}
