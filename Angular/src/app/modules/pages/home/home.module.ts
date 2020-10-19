import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule} from './home.routes';

// Diseño de la la aplicacion
import {ContentHomeComponent} from '../../components/content-home/content-home.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {FooterLeftComponent} from '../../components/footer-left/footer-left.component';
import { HeaderComponent } from '../../components/header/header.component';


import {PatientComponent} from './patient/patient.component';

@NgModule({
  declarations: [
    PatientComponent,
    ContentHomeComponent,
    FooterComponent,
    FooterLeftComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})

export class HomeModule { }
