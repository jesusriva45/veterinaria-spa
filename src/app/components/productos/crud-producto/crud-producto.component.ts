import { Component, OnInit } from '@angular/core';



import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../services/producto.service'

import { Producto } from '../../../models/producto';


import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2'
import {   

  FormGroup,
  FormControl,
  Validators} from '@angular/forms';


@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})
export class CrudProductoComponent implements OnInit {

  
  productos: Producto[] = [];

  usuario: Producto = new Producto();

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
    private productoService: ProductoService, 
    private router: Router, 
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute) {

      this.titulo;

     }

  ngOnInit(): void {
    this.productoService .getProductos().subscribe(
      productos => this.productos = productos
    );  


  }




}
