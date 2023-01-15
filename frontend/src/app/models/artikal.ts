export class Artikal {
    sifra: string
    naziv: string
    jedinica_mere: string
    stopa_poreza: number
    proizvodjac: string
    vrsta: string

    zemlja_porekla: string
    strani_naziv: string
    barkod: string
    carinska_tarifa: number
    taksa: string
    min_zalihe: number
    max_zalihe: number
    opis: string
    pripada: boolean
    deklaracija: string
    slika:string

    public constructor(a: Artikal) {
        if (a != null) {
            this.sifra = a.sifra
            this.naziv = a.naziv
            this.jedinica_mere = a.jedinica_mere
            this.stopa_poreza = a.stopa_poreza
            this.proizvodjac = a.proizvodjac
            this.vrsta = a.vrsta
            this.zemlja_porekla = a.zemlja_porekla
            this.strani_naziv = a.strani_naziv
            this.barkod = a.barkod
            this.carinska_tarifa = a.carinska_tarifa
            this.taksa = a.taksa
            this.min_zalihe = a.min_zalihe
            this.max_zalihe = a.max_zalihe
            this.deklaracija = a.deklaracija
            this.opis = a.opis
        }
    }
}