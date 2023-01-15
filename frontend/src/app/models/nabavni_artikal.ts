import { Artikal } from './artikal'

export class NabavniArtikal {
    art: Artikal
    nabavna_cena_rsd:number
    prodajna_cena_rsd:number
    tekuce_stanje_lagera:number
    min_zeljena_kol:number
    max_zeljena_kol:number

    public constructor(n:NabavniArtikal){
        if(n==null) return
        this.nabavna_cena_rsd=n.nabavna_cena_rsd
        this.prodajna_cena_rsd=n.prodajna_cena_rsd
        this.tekuce_stanje_lagera=n.tekuce_stanje_lagera
        this.min_zeljena_kol=n.min_zeljena_kol
        this.max_zeljena_kol=n.max_zeljena_kol
        this.art=new Artikal(n.art)
    }
}