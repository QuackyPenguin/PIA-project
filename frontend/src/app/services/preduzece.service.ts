import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreduzeceService {

  constructor(private httpService: HttpClient) {
    this.uri = 'http://localhost:4000'
  }

  uri: string

  svaPreduzeca() {
    return this.httpService.get(`${this.uri}/preduzeca/svaPreduzeca`)
  }

  registracija(odgovorno_liceForma, kor_imeForma, lozinkaForma, telefonForma, imejlForma,
    nazivForma, drzavaForma, gradForma, postanski_brojForma, ulicaForma, brojForma, pibForma, maticniForma, statusForma, slikaForma) {
    const data = {
      odgovorno_lice: odgovorno_liceForma,
      kor_ime: kor_imeForma,
      lozinka: lozinkaForma,
      telefon: telefonForma,
      imejl: imejlForma,
      naziv: nazivForma,
      drzava: drzavaForma,
      grad: gradForma,
      postanski_broj: postanski_brojForma,
      ulica: ulicaForma,
      broj: brojForma,
      pib: pibForma,
      maticni: maticniForma,
      status: statusForma,
      slika: slikaForma
    }

    return this.httpService.post(`${this.uri}/preduzeca/registracija`, data)
  }

  dodajNarucioca(kor_imeForma, narucilacForma) {
    const data = {
      kor_ime: kor_imeForma,
      narucilac: narucilacForma
    }

    return this.httpService.post(`${this.uri}/preduzeca/dodajNarucioca`, data)
  }

  menjajLozinku(kor_imeForma, lozinkaForma) {
    const data = {
      kor_ime: kor_imeForma,
      lozinka: lozinkaForma
    }

    return this.httpService.post(`${this.uri}/preduzeca/menjajLozinku`, data)
  }

  promenaPodataka(pred) {
    const data = {
      odgovorno_lice: pred.odgovorno_lice,
      kor_ime: pred.kor_ime,
      lozinka: pred.lozinka,
      telefon: pred.telefon,
      imejl: pred.imejl,
      pib: pred.pib,
      maticni: pred.maticni,
      kategorija: pred.kategorija,
      delatnosti: pred.delatnosti,
      PDVsistem: pred.PDVsistem,
      ziro_racuni: pred.ziro_racuni,
      magacini: pred.magacini,
      kase: pred.kase
    }

    return this.httpService.post(`${this.uri}/preduzeca/promenaPodataka`, data)
  }

  prijava(kor_imeForma, lozinkaForma) {
    const data = {
      kor_ime: kor_imeForma,
      lozinka: lozinkaForma
    }

    return this.httpService.post(`${this.uri}/preduzeca/prijava`, data)
  }

  promenaStatusa(kor_imeForma, statusForma) {
    const data = {
      kor_ime: kor_imeForma,
      status: statusForma
    }

    return this.httpService.post(`${this.uri}/preduzeca/promenaStatusa`, data)
  }

  sacuvajArtikal(kor_imeForma, artikliForma, magaciniForma, kaseForma) {
    const data = {
      kor_ime: kor_imeForma,
      artikli: artikliForma,
      magacini: magaciniForma,
      kase: kaseForma
    }

    return this.httpService.post(`${this.uri}/preduzeca/sacuvajArtikal`, data)
  }

  sacuvajKategorije(kor_imeForma, kategorijeForma) {
    const data = {
      kor_ime: kor_imeForma,
      kategorije: kategorijeForma
    }

    return this.httpService.post(`${this.uri}/preduzeca/sacuvajKategorije`, data)
  }

  sacuvajPodatke(kor_imeForma, kategorijaForma, delatnostiForma, PDVsistemForma, ziro_racuniForma, magaciniForma, kaseForma) {
    const data = {
      kor_ime: kor_imeForma,
      kategorija: kategorijaForma,
      delatnosti: delatnostiForma,
      PDVsistem: PDVsistemForma,
      ziro_racuni: ziro_racuniForma,
      magacini: magaciniForma,
      kase: kaseForma
    }

    return this.httpService.post(`${this.uri}/preduzeca/sacuvajPodatke`, data)
  }

  sacuvajOdeljenja(kor_imeForma, odeljenjaForma) {
    const data = {
      kor_ime: kor_imeForma,
      odeljenja: odeljenjaForma
    }

    return this.httpService.post(`${this.uri}/preduzeca/sacuvajOdeljenja`, data)
  }

  sacuvajRacune(kor_imeForma, racuniForma) {
    const data = {
      kor_ime: kor_imeForma,
      racuni: racuniForma
    }

    return this.httpService.post(`${this.uri}/preduzeca/sacuvajRacune`, data)
  }
}
