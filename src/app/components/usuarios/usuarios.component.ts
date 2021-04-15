import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';

import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

import { Ubigeo } from '../../models/ubigeo';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  usuario: Usuario = new Usuario();

  titulo: string = 'Agregar Usuario';

  //---- parametro para detalle - actualizar
  idUsario: number;

  ubigeo: Ubigeo[];

  button = document.getElementsByClassName('crud');
  input = document.getElementsByClassName('form-input');

  //------------------- CAMPOS DE FORMULARIO --------------------------------
  myform: FormGroup;
  IdUsuario: FormControl;
  Nombres: FormControl;
  Apellidos: FormControl;
  email: FormControl;
  FechaNac: FormControl;
  id_ubi: FormControl;

  //---------------------------------------------------------------------

  //mostrar alerta de validacion
  submitted: boolean = false;

  // button = document.getElementsByClassName("crud")

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.titulo;
  }

  ngOnInit(): void {
    this.usuarioService
      .getUsuarios()
      .subscribe((usuarios) => (this.usuarios = usuarios));
    //this.createFormControls();
    //this.createForm();
  }

  ngOnDestroy() {}

  //------------------- VALIDACION DE FORMULARIO --------------------------------
  createFormControls() {
    this.IdUsuario = new FormControl('', [Validators.nullValidator]);
    this.Nombres = new FormControl('', [Validators.required]);
    this.Apellidos = new FormControl('', [Validators.required]);
    this.id_ubi = new FormControl(null);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^[a-zA-Z]{1,}([.]{1})?[a-zA-Z]{1,}[@]{1}[a-zA-Z]{1,}[.]{1}[a-z]{2,5}([.][a-z]{2,3})?$'
      ),
    ]);
    this.FechaNac = new FormControl('', [Validators.required]);
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        Nombres: this.Nombres,
        Apellidos: this.Apellidos,
        IdUsuario: this.IdUsuario,
        email: this.email,
        FechaNac: this.FechaNac,
        id_ubi: this.id_ubi,
      }),
    });
  }

  //--------------------- RENDERIZADO DE MODAL PARA CRUD DE USUARIOS --------------------------
  openModalCrud(
    targetModal: Component,
    accion: string,
    idUsario?: number
  ): void {
    this.createFormControls();
    this.createForm();

    this.modalService.open(targetModal, {
      centered: true,
      animation: true,
      backdropClass: 'modal-backdrop',
      size: 'xl',
      keyboard: false,
    });

    if (accion == 'detalle') {
      //this.titulo = "Detalles de Usuario"

      console.log(this.usuario.id_usuario);
      this.getUsuarioId(idUsario);
      //this.getUbigeo();
      for (let j = 0; j < this.input.length; j++) {
        this.input[j].setAttribute('disabled', '');
      }
    } else if (accion == 'editar') {
      this.titulo = 'Actualizar Información';
      this.usuario.id_usuario = idUsario;
      this.getUsuarioId(idUsario);
      //this.getUbigeo();
      console.log(this.usuario.id_usuario);
    } else if (accion == 'agregar') {
      this.getUbigeo();
      this.usuario.id_usuario = 0;
      this.titulo = 'Registro de Usuario';
      //this.modalAgregar();
      //this.myform.clearValidators();
    }
  }

  //---------- sin uso ----- NgbModal keyboard ------------
  alertDismiss(): boolean {
    this.myform.reset();
    this.submitted = false;
    return true;
  }

  cerrarmodal() {
    this.submitted = false;
    this.modalService.dismissAll();
    this.myform.reset();
    //this.usuarioService.getRegiones().subscribe((ubigeo) => (this.ubigeo = []));
  }

  compareUbigeo(t1: Ubigeo, t2: Ubigeo): boolean {
    //console.log(t1.id_ubigeo + t2.id_ubigeo);
    return t1 === null || t2 === null || t1 === undefined || t2 === undefined
      ? false
      : t1.id_ubigeo === t2.id_ubigeo;
  }

  /*compareFn(o1: Ubigeo, o2: Ubigeo): boolean {
  if (o1 === undefined && o2 === undefined) {
    return true;
  }

  return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id_ubigeo === o2.id_ubigeo;
}*/

  verificarDatos(): void {
    for (let j = 0; j < this.input.length; j++) {
      if (this.myform.invalid) {
        swal.fire({
          icon: 'error',
          title: 'Cuidado...! Aun te faltan datos por completar. ',
          // text: 'Oops...'
        });
        this.submitted = true;
        console.log(this.submitted);
        //this.myform.invalid;
      }
      if (this.myform.valid) {
        //this.click = false;
        swal
          .fire({
            title: 'Verificar tus datos antes de continuar...',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, registrarse',
          })
          .then((result) => {
            if (this.usuario.id_usuario === 0) {
              if (result.isConfirmed) {
                swal.fire(
                  'Registro Exitoso...!',
                  `${this.usuario.nombres} bienvenido a nuestra veterinaria`,
                  'success'
                );
                this.insert();
                this.modalService.dismissAll();
              }
            } else if (
              this.usuario.id_usuario != 0 &&
              this.usuario.id_usuario > 0
            ) {
              if (result.isConfirmed) {
                swal.fire(
                  'Update Exitoso...!',
                  `${this.usuario.nombres} tus datos se actualizaron correctamente`,
                  'success'
                );
                this.update();
                this.modalService.dismissAll();
              }
            }
          });
      }
    }
  }

  //------------------ CRUD DE USUARIOS ---------------------------

  insert(): void {
    this.usuarioService.insert(this.usuario).subscribe((response) => {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
      // this.router.navigate([window.location.reload()]);
    });
  }

  getUsuarioId(idUsario) {
    this.usuarioService
      .getUsuario(idUsario)
      .subscribe((usuario) => (this.usuario = usuario));
  }

  update(): void {
    this.usuarioService.update(this.usuario).subscribe((response) => {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
      // this.router.navigate([window.location.reload()]);
    });
  }

  getUbigeo() {
    this.usuarioService
      .getRegiones()
      .subscribe((ubigeo) => (this.ubigeo = ubigeo));
  }
}
