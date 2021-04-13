import { Component,  OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';

import { Router } from '@angular/router';


import { UsuarioService } from '../../services/usuario.service';

import {NgbModal } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2'
import {   

  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { Ubigeo } from '../../models/ubigeo';






@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {


  usuarios: Usuario[] = [];

  usuario: Usuario = new Usuario();

  closeResult : String;

  titulo: string = "Agregar Usuario";


  idUsario: number;

  
  ubigeo : Ubigeo[];
  

  

  

  button = document.getElementsByClassName("crud");
  input = document.getElementsByClassName("form-input");
  myform: FormGroup;
  IdUsuario: FormControl;
  Nombres: FormControl;
  Apellidos: FormControl;
  email: FormControl;
  FechaNac: FormControl;

  id_ubi: FormControl;


 // button = document.getElementsByClassName("crud")

  constructor(
    private usuarioService: UsuarioService, 
    private router: Router, 
    private modalService: NgbModal
    ) {

      this.titulo;

     }

  ngOnInit(): void {

    this.usuarioService.getRegiones().subscribe(ubigeo =>{ this.ubigeo = ubigeo });
  

    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    );      


    this.createFormControls();
    this.createForm();

  }

  ngOnDestroy() {
   
   
  }

  
  

  createFormControls() {
    this.IdUsuario = new FormControl('', Validators.nullValidator);
    this.Nombres = new FormControl('', Validators.required);
    this.Apellidos = new FormControl('', Validators.required);
    this.id_ubi = new FormControl(null);
    this.email = new FormControl('', [
      Validators.required,
      Validators.minLength(15)
    ]);
    this.FechaNac = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);  
   
  }



  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({        
      Nombres: this.Nombres,
      Apellidos: this.Apellidos,     
      IdUsuario: this.IdUsuario,
      email: this.email,
      FechaNac: this.FechaNac,
      id_ubi: this.id_ubi
    })   
    });
  }

  


 




openModalCrud(targetModal  : Component,  accion : string, idUsario ? :number):void {

  this.createFormControls();
  this.createForm();

    this.modalService.open(targetModal, {      
       centered: true,
      animation: true,    
      backdropClass: "modal-backdrop",
       size: 'xl',
     
   });
     
    if( accion == "detalle"){     
      //this.titulo = "Detalles de Usuario"
     idUsario;
      console.log(this.usuario.id_usuario);

      this.getUsuarioId(idUsario)

      for (let j = 0; j < this.input.length; j++) {
        this.input[j].setAttribute("disabled","");       
      }     
        
    } 

    else if( accion == "editar"){
      this.titulo = "Actualizar Información"
      this.usuario.id_usuario = idUsario;
      this.getUsuarioId(idUsario)      
      console.log(this.usuario.id_usuario);
      
      
    } 
     else if( accion == "agregar"){
      this.usuario.id_usuario = 0
     this.titulo = "Registro de Usuario"
     //this.modalAgregar();    
     //this.myform.clearValidators();  
    }    
 }

 

cerrarmodal(){
  this.modalService.dismissAll();
  this.myform.reset();  
}




 

compareUbigeo(t1:Ubigeo, t2:Ubigeo): boolean {
 //console.log(t1.id_ubigeo + t2.id_ubigeo);
 return t1 === null || t2 === null || t1 === undefined || t2 === undefined ? false : t1.id_ubigeo === t2.id_ubigeo; 
}


/*compareFn(o1: Ubigeo, o2: Ubigeo): boolean {
  if (o1 === undefined && o2 === undefined) {
    return true;
  }

  return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id_ubigeo === o2.id_ubigeo;
}*/
  




  
verificarDatos(): void{  

      for (let j = 0; j < this.input.length; j++) {        
          if(!this.myform.valid){
            swal.fire({
              icon: 'error',
              title: 'Cuidado...! Aun te faltan datos por completar. '
             // text: 'Oops...'        
            })          
           this.myform.invalid
          }
         if (this.myform.valid){
          //this.click = false;
          swal.fire({
            title: 'Verificar tus datos antes de continuar...',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, registrarse'
          }).then((result) => {


           if(this.usuario.id_usuario === 0){
            if (result.isConfirmed) {
              swal.fire(
                'Registro Exitoso...!',
                'Bienvenido a nuestra veterinaria',
                'success'
              )  
              this.insert();
              this.modalService.dismissAll();
      
              
            }
           } 
           else if(this.usuario.id_usuario != 0 && this.usuario.id_usuario>0){
            if (result.isConfirmed) {
              swal.fire(
                'Update Exitoso...!',
                'Bienvenido a nuestra veterinaria',
                'success'
              )  
              this.insert();
              this.modalService.dismissAll();
      
              
            }
           }      
          })
        }          
      } 
 } 


 insert():void{
  this.usuarioService.insert(this.usuario).subscribe(
    response => {             
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {                      
         
        this.router.navigate([currentUrl]);
      });        
       // this.router.navigate([window.location.reload()]);       
    }    
  )
}


getUsuarioId(idUsario){
  

  this.usuarioService.getUsuario(idUsario).subscribe( (usuario) => this.usuario = usuario)



}

update():void{
  this.usuarioService.update(this.usuario).subscribe(
    response => {             
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {                      
         
        this.router.navigate([currentUrl]);
      });        
       // this.router.navigate([window.location.reload()]);       
    }    
  )
}







}
