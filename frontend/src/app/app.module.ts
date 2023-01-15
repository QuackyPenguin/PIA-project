import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { KupacComponent } from './kupac/kupac.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { PreduzecePrviPutComponent } from './preduzece-prvi-put/preduzece-prvi-put.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatRadioModule } from '@angular/material/radio'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';
import { AdminKupacRegistracijaComponent } from './admin-kupac-registracija/admin-kupac-registracija.component';
import { AdminObradaPreduzecaComponent } from './admin-obrada-preduzeca/admin-obrada-preduzeca.component'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminPreduzeceRegistracijaComponent } from './admin-preduzece-registracija/admin-preduzece-registracija.component';
import { PodaciOPreduzecuComponent } from './podaci-o-preduzecu/podaci-o-preduzecu.component'
import { MatIconModule } from '@angular/material/icon';
import { NaruciociComponent } from './narucioci/narucioci.component';
import { RobeIUslugeComponent } from './robe-i-usluge/robe-i-usluge.component'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RasporedArtikalaComponent } from './raspored-artikala/raspored-artikala.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrisiDialogComponent } from './brisi-dialog/brisi-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DodeliArtikalDialogComponent } from './dodeli-artikal-dialog/dodeli-artikal-dialog.component';
import { RasporedStolovaComponent } from './raspored-stolova/raspored-stolova.component'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DodajStoComponent } from './dodaj-sto/dodaj-sto.component';
import { IzdavanjeRacunaComponent } from './izdavanje-racuna/izdavanje-racuna.component';
import { PregledIzvestajaComponent } from './pregled-izvestaja/pregled-izvestaja.component'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { DatePipe } from '@angular/common';
import { KupacPregledRacunaComponent } from './kupac-pregled-racuna/kupac-pregled-racuna.component';
import { PregledDnevnihIzvestajaComponent } from './pregled-dnevnih-izvestaja/pregled-dnevnih-izvestaja.component';
import {NgxChartsModule} from '@swimlane/ngx-charts'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PreduzeceComponent,
    KupacComponent,
    LoginAdminComponent,
    PreduzecePrviPutComponent,
    AdminComponent,
    AdminKupacRegistracijaComponent,
    AdminObradaPreduzecaComponent,
    AdminPreduzeceRegistracijaComponent,
    PodaciOPreduzecuComponent,
    NaruciociComponent,
    RobeIUslugeComponent,
    RasporedArtikalaComponent,
    BrisiDialogComponent,
    DodeliArtikalDialogComponent,
    RasporedStolovaComponent,
    DodajStoComponent,
    IzdavanjeRacunaComponent,
    PregledIzvestajaComponent,
    KupacPregledRacunaComponent,
    PregledDnevnihIzvestajaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatCheckboxModule,
    MatDialogModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxChartsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
