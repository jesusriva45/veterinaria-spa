import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';

import { Router } from '@angular/router';


import { UsuarioService } from './usuario.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import swal, { SweetAlertResult } from 'sweetalert2'

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



  


  

  constructor(private usuarioService: UsuarioService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usuarioService .getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    );  

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

  open(content):void  {    

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }

  private getDismissReason(reason: any): any {

    if (reason === ModalDismissReasons.ESC) {
  
      return 'by pressing ESC';
  
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  
      return console.log('by clicking on a backdrop');
  
    } else {
     
      return  `with: ${reason}`;
  
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

  
  verificarDatos(): void{
    // console.log("Clicked")
   //console.log(this.usuario)  
  //if(usuarioForm.value.usuarioId == null){
  

    swal.fire({
      title: 'Verificar tus datos antes de continuar...',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
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
  
 
   
  //}  
 /*this.router.navigate(['usuarios'] */  
 } 




}
