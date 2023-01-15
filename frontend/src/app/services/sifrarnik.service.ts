import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SifrarnikService {

  constructor(private httpService: HttpClient) {
    this.uri = 'http://localhost:4000'
  }

  uri: string

  sveSifre(){
    return this.httpService.get(`${this.uri}/sifre/sveSifre`)
  }
}
