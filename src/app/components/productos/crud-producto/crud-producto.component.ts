import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';

import { Producto } from '../../../models/producto';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria';
import { Proveedor } from 'src/app/models/proveedor';

@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css'],
})
export class CrudProductoComponent implements OnInit {
  productos: Producto[] = [];

  categoria: Categoria[] = [];

  proveedor: Proveedor[] = [];

  producto: Producto = new Producto();

  closeResult: String;

  titulo: string = 'Agregar Usuario';

  Id_Producto: number;

  button = document.getElementsByClassName('crud');
  input = document.getElementsByClassName('form-input');
  myform: FormGroup;
  IdProducto: FormControl;
  Nombre: FormControl;
  Descripcion: FormControl;
  foto: FormControl;
  Indicaciones: FormControl;
  Marca: FormControl;
  Precio: FormControl;
  Serie: FormControl;
  Stock: FormControl;
  IdCategoria: FormControl;
  IdProveedor: FormControl;

  // button = document.getElementsByClassName("crud")

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute
  ) {
    this.titulo;
  }

  ngOnInit(): void {
    this.productoService
      .getProductos()
      .subscribe((productos) => (this.productos = productos));
  }

  createFormControls() {
    this.IdProducto = new FormControl('', Validators.nullValidator);
    this.Nombre = new FormControl('', Validators.required);
    this.Descripcion = new FormControl('', Validators.required);
    this.foto = new FormControl(null);
    this.Indicaciones = new FormControl('', Validators.required);
    this.Marca = new FormControl('', Validators.required);
    this.Precio = new FormControl('', Validators.required);
    this.Serie = new FormControl('', Validators.required);
    this.Stock = new FormControl('', Validators.required);
    this.IdCategoria = new FormControl('', Validators.required);
    this.IdProveedor = new FormControl('', Validators.required);
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        IdProducto: this.IdProducto,
        Nombre: this.Nombre,
        Descripcion: this.Descripcion,
        foto: this.foto,
        Indicaciones: this.Indicaciones,
        Marca: this.Marca,
        Precio: this.Precio,
        Serie: this.Serie,
        Stock: this.Stock,
        IdCategoria: this.IdCategoria,
        IdProveedor: this.IdProveedor,
      }),
    });
  }
}
