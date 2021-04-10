import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HttpClientModule } from '@angular/common/http' 
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'


import { ROUTES } from './app.routes';
import { FormComponent } from './components/usuarios/form/form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CrudProductoComponent } from './components/productos/crud-producto/crud-producto.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { CrudServicioComponent } from './components/servicios/crud-servicio/crud-servicio.component';
import { CarritoProductosComponent } from './components/productos/carrito-productos/carrito-productos.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { HistoriaClinicaComponent } from './components/mascotas/historia-clinica/historia-clinica.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { RegistroClienteComponent } from './components/clientes/registro-cliente/registro-cliente.component';
import { RegistroMascotaComponent } from './components/mascotas/registro-mascota/registro-mascota.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    UsuariosComponent,
    FormComponent,
    ProductosComponent,
    CrudProductoComponent,
    ServiciosComponent,
    CrudServicioComponent,
    CarritoProductosComponent,
    MascotasComponent,
    HistoriaClinicaComponent,
    ClientesComponent,
    RegistroClienteComponent,
    RegistroMascotaComponent,    

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
