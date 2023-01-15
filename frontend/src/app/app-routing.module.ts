import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminKupacRegistracijaComponent } from './admin-kupac-registracija/admin-kupac-registracija.component';
import { AdminObradaPreduzecaComponent } from './admin-obrada-preduzeca/admin-obrada-preduzeca.component';
import { AdminPreduzeceRegistracijaComponent } from './admin-preduzece-registracija/admin-preduzece-registracija.component';
import { AdminComponent } from './admin/admin.component';
import { IzdavanjeRacunaComponent } from './izdavanje-racuna/izdavanje-racuna.component';
import { KupacPregledRacunaComponent } from './kupac-pregled-racuna/kupac-pregled-racuna.component';
import { KupacComponent } from './kupac/kupac.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginComponent } from './login/login.component';
import { NaruciociComponent } from './narucioci/narucioci.component';
import { PodaciOPreduzecuComponent } from './podaci-o-preduzecu/podaci-o-preduzecu.component';
import { PreduzecePrviPutComponent } from './preduzece-prvi-put/preduzece-prvi-put.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { PregledDnevnihIzvestajaComponent } from './pregled-dnevnih-izvestaja/pregled-dnevnih-izvestaja.component';
import { PregledIzvestajaComponent } from './pregled-izvestaja/pregled-izvestaja.component';
import { RasporedArtikalaComponent } from './raspored-artikala/raspored-artikala.component';
import { RasporedStolovaComponent } from './raspored-stolova/raspored-stolova.component';
import { RegisterComponent } from './register/register.component';
import { RobeIUslugeComponent } from './robe-i-usluge/robe-i-usluge.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path: "registracija", component:RegisterComponent},
  {path: "preduzece", component:PreduzeceComponent},
  {path: "kupac", component:KupacComponent},
  {path: "preduzece-prvi-put", component:PreduzecePrviPutComponent},
  {path: "login-admin", component:LoginAdminComponent},
  {path: "admin", component:AdminComponent},
  {path: "admin-kupac-registracija", component:AdminKupacRegistracijaComponent},
  {path: "admin-obrada-preduzeca", component:AdminObradaPreduzecaComponent},
  {path: "admin-preduzece-registracija", component:AdminPreduzeceRegistracijaComponent},
  {path: "podaci-o-preduzecu", component:PodaciOPreduzecuComponent},
  {path: "robe-i-usluge", component:RobeIUslugeComponent},
  {path: "narucioci", component:NaruciociComponent},
  {path: "raspored-artikala", component:RasporedArtikalaComponent},
  {path: "raspored-stolova", component:RasporedStolovaComponent},
  {path: "izdavanje-racuna", component:IzdavanjeRacunaComponent},
  {path: "pregled-izvestaja", component:PregledIzvestajaComponent},
  {path: "kupac-pregled-racuna", component:KupacPregledRacunaComponent},
  {path: "pregled-dnevnih-izvestaja", component:PregledDnevnihIzvestajaComponent},
  {path:"**", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
