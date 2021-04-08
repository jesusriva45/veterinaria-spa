import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormComponent } from './components/usuarios/form/form.component';


export const ROUTES : Routes = [
    { path: '', pathMatch: 'full', redirectTo:'inicio'},
    { path: 'usuarios',  component: UsuariosComponent },
    { path: 'inicio',  component: InicioComponent },
    //{ path: 'usuarios/form',  component: FormComponent },
] 