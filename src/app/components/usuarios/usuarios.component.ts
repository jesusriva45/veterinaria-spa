import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';

import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2';
import {
  FormGroup,
  FormControl,
  Validators
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
  Dni: FormControl;
  Telef: FormControl;
  Direc: FormControl;
  Correo: FormControl;
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
    this.Dni = new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]);
    this.Telef = new FormControl('', [Validators.required]);
    this.Direc = new FormControl('', [Validators.required]);
    this.id_ubi = new FormControl('', [Validators.required]);
    this.Correo = new FormControl('', [
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
        IdUsuario: this.IdUsuario,
        Nombres: this.Nombres,
        Apellidos: this.Apellidos,
        Dni: this.Dni,
        Telef: this.Telef,
        Direc: this.Direc,
        Correo: this.Correo,
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

      console.log(this.usuario.idusuario);
      this.getUsuarioId(idUsario);
      this.getUbigeo();
      for (let j = 0; j < this.input.length; j++) {
        this.input[j].setAttribute('disabled', '');
      }
    } else if (accion == 'editar') {
      this.titulo = 'Actualizar Información';
      this.usuario.idusuario = idUsario;
      this.getUsuarioId(idUsario);
      this.getUbigeo();
      console.log(this.usuario.idusuario);
    } else if (accion == 'agregar') {
      this.getUbigeo();
      this.usuario.idusuario = 0;
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
      : t1.idubigeo === t2.idubigeo;
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
            if (this.usuario.idusuario === 0) {
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
              this.usuario.idusuario != 0 &&
              this.usuario.idusuario > 0
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


  delete(usuario: Usuario):void{
  
    swal
    .fire({
      title: `Seguro desea eliminar al usuario ${usuario.nombres} ${usuario.apellidos}...`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result)=>{
         if(result.isConfirmed){
          this.usuarioService.delete(usuario.idusuario).subscribe((response)=>{
              this.usuarios = this.usuarios.filter(usu => usu != usuario)
              swal.fire(
                `${this.usuario.nombres} ha sido eliminado...!`,            
                'success'
                )
          })
         }
    })

  }

  getUbigeo() {
    this.usuarioService
      .getRegiones()
      .subscribe((ubigeo) => (this.ubigeo = ubigeo));
  }
}
