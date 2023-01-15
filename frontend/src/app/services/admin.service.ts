import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpService: HttpClient) {
    this.uri = 'http://localhost:4000'
  }

  uri: string

  prijava(kor_imeForma, lozinkaForma){
    const data={
      kor_ime:kor_imeForma,
      lozinka: lozinkaForma
    }

    return this.httpService.post(`${this.uri}/admin/prijava`, data)
  }
}
