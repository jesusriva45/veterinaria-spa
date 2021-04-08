import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

import { HttpClientModule } from '@angular/common/http' 
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'


import { ROUTES } from './app.routes';
import { FormComponent } from './components/usuarios/form/form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    UsuariosComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot( ROUTES , {onSameUrlNavigation: 'reload'}),
    NgbModule  
  ],
  providers: [NgbModule],
  bootstrap: [AppComponent],
  entryComponents: [ 
    FormComponent 
  ] 
})
export class AppModule { }
