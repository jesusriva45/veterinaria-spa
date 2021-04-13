import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario'
import { UsuarioService } from '../../../services/usuario.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
//import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2'

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {



  usuario: Usuario = new Usuario();
  titulo: string = "Agregar Usuario";
  isHidden: boolean = true;

  closeResult : String;

  /*
 this.userInfoForm = new FormGroup({
      userInfoUserName: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      userInfoName: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      userInfoSurName: new FormControl({ value: '' }, Validators.compose([Validators.required]))
    });*/
  
  constructor(private usuarioService: UsuarioService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {

  }


  public insert(usuarioForm: NgForm): void{
   // console.log("Clicked")
  //console.log(this.usuario)  
 if(usuarioForm.value.usuarioId == null){

  this.usuarioService.insert(usuarioForm.value).subscribe(
    response => {             
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {                      
         
        this.router.navigate([currentUrl]);
      });   

     
       // this.router.navigate([window.location.reload()]);    
      
      
    }
    
  )  
 }  
/*this.router.navigate(['usuarios'] */  

} 


public open(content):void  {

  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    this.closeResult = `Closed with: ${result}`;

  }, (reason) => {

    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

  });

}

private getDismissReason(reason: any): string {

  if (reason === ModalDismissReasons.ESC) {

    return 'by pressing ESC';

  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

    return 'by clicking on a backdrop';

  } else {

    return  `with: ${reason}`;

  }

}

  

}
