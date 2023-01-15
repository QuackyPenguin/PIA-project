import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KasaService {

  constructor(private httpService: HttpClient) {
    this.uri = 'http://localhost:4000'
  }

  uri: string

  sveKase(){
    return this.httpService.get(`${this.uri}/kase/sveKase`)
  }
}
