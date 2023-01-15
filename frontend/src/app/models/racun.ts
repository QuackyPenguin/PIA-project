import { Narucilac } from "./narucilac";
import { Stavka } from "./stavka";

export class Racun{
    stavke:Array<Stavka>
    cena: number
    nacin_placanja:string
    brojLK:string
    ime:string
    prezime:string
    brojSlip:string
    narucilac:Narucilac
    datum:Date
    lokacija:string
}