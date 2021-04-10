import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';

import { Router, ActivatedRoute } from '@angular/router';


import { UsuarioService } from './usuario.service'
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2'
import {   

  FormGroup,
  FormControl,
  Validators} from '@angular/forms';


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

  

  

  

  button = document.getElementsByClassName("crud");
  input = document.getElementsByClassName("form-input");
  myform: FormGroup;
  IdUsuario: FormControl;
  Nombres: FormControl;
  Apellidos: FormControl;
  email: FormControl;
  FechaNac: FormControl;




 // button = document.getElementsByClassName("crud")

  constructor(
    private usuarioService: UsuarioService, 
    private router: Router, 
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute) {

      this.titulo;

     }

  ngOnInit(): void {
    this.usuarioService .getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    );      


    this.createFormControls();
    this.createForm();

  }




  createFormControls() {
    this.IdUsuario = new FormControl('', Validators.nullValidator);
    this.Nombres = new FormControl('', Validators.required);
    this.Apellidos = new FormControl('', Validators.required);
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
      FechaNac: this.FechaNac 
    })   
    });
  }

  


  
  /*open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
        this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
            this.closeResult = 'Closed with: $result';
        }, (reason) => {
            this.closeResult = 'Dismissed $this.getDismissReason(reason)';
        });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
          this.closeResult = 'Closed with: $result';
      }, (reason) => {
          this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else {
        this.modalService.open(content,{ centered: true }).result.then((result) => {
            this.closeResult = 'Closed with: $result';
        }, (reason) => {
            this.closeResult = 'Dismissed $this.getDismissReason(reason)';
        });
    }
  }*/

  

openModalCrud(targetModal : Component, idUsario :number, accion: string):void {
    this.modalService.open(targetModal, {      
       centered: true,
      animation: true,    
      backdropClass: "modal-backdrop",
       size: 'xl',
     
   });
     
    if( accion == "detalle"){     
      this.titulo = "Detalles de Usuario"
      this.usuario.id_usuario = idUsario;
      console.log(this.usuario.id_usuario);
      
      this.getUsuarioId(idUsario)
      for (let j = 0; j < this.input.length; j++) {
        this.input[j].setAttribute("disabled","");       
      }      

    } 

    else if( accion == "editar"){
      this.titulo = "Actualizar Información"
      this.getUsuarioId(idUsario)
      this.usuario.id_usuario = idUsario;      
      console.log(this.usuario.id_usuario);
      
      
    } 
     else if( accion == "agregar"){
     this.titulo = "Registro de Usuario"
     this.modalAgregar();     
    }    
 }

 



 modalAgregar(){  

  this.usuario.id_usuario=0;
  this.usuario.nombres="";
  this.usuario.apellidos="";
  this.usuario.email="";
  this.usuario.fecha_nac="";
  this.myform.reset();
  this.myform.clearValidators();
      this.usuario.id_usuario = 0;
      for (let j = 0; j < this.input.length; j++) {
        this.input[j].setAttribute("ng-reflect-model"," ");  
        console.log(`${this.usuario.id_usuario } "HOLA" ${ this.input[j].setAttribute("ng-reflect-model","0")}`);     
      } 
 }


 

 
  



/*cargarUsuario():void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.usuarioService.getUsuario(id).subscribe( (usuario) => this.usuario = usuario)
      }
    })
}
*/



  
verificarDatos(): void{
    // console.log("Clicked")
   //console.log(this.usuario)  
  //if(usuarioForm.value.usuarioId == null){
  
   // onButtonClick(){
      for (let j = 0; j < this.input.length; j++) {     
    
         // if (this.usuario.email == null || this.usuario.nombres == null || this.usuario.apellidos == null || this.usuario.fecha_nac == null) {
          if(!this.myform.valid){
            swal.fire({
              icon: 'error',
              title: 'Cuidado...! Aun te faltan datos por completar. '
             // text: 'Oops...'        
            })
           // this.click = !this.click;
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
            if (result.isConfirmed) {
              swal.fire(
                'Registro Exitoso...!',
                'Bienvenido a nuestra veterinaria',
                'success'
              )  
              this.insert();
              this.modalService.dismissAll();
      
              
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




/* open(content):void  {    

  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    this.closeResult = `Closed with: ${result}`;

  }, (reason) => {

   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

  });

}*/

/*private getDismissReason(reason: any): any {

  if (reason === ModalDismissReasons.ESC) {

    return 'by pressing ESC';

  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

    return console.log('by clicking on a backdrop');

  } else {
   
    return  `with: ${reason}`;

  }

}*/



}
