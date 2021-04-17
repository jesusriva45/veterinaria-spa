import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularEditorModule } from '@kolkov/angular-editor';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';
import { FormComponent } from './components/usuarios/form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';

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
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { MdbModule } from 'mdb-angular-ui-kit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    PedidosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { onSameUrlNavigation: 'reload' }),
    NgbModule,
    MdbModule,
    BrowserAnimationsModule,
    CommonModule,
    ScrollingModule,
    AngularEditorModule,
  ],
  providers: [NgbModule],
  bootstrap: [AppComponent],
  entryComponents: [FormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
