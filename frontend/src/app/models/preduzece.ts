import { Artikal } from "./artikal";
import { Delatnost } from "./delatnost";
import { Kasa } from "./kasa";
import { Kategorija } from "./kategorija";
import { Magacin } from "./magacin";
import { Narucilac } from "./narucilac";
import { Odeljenje } from "./odeljenje";
import { Racun } from "./racun";
import { ZiroRacun } from "./ziro_racun";

export class Preduzece{
    odgovorno_lice: string;
    kor_ime: string;
    lozinka: string;
    telefon: string;
    imejl: string;
    naziv: string;
    drzava: string;
    grad: string;
    postanski_broj: number;
    ulica: string;
    broj: string;
    pib: string;
    maticni: number;
    status: number;
    delatnosti: Array<Delatnost>;
    kategorija: string;
    PDVsistem: boolean;
    ziro_racuni: Array<ZiroRacun>;
    magacini: Array<Magacin>;
    kase: Array<Kasa>;
    narucioci: Array<Narucilac>
    artikli:Array<Artikal>
    kategorije:Array<Kategorija>
    odeljenja:Array<Odeljenje>
    racuni:Array<Racun>
    slika:string
}