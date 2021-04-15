import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';

import { Producto } from '../../../models/producto';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria';
import { Proveedor } from 'src/app/models/proveedor';
import { Marca } from 'src/app/models/marca';

@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css'],
})
export class CrudProductoComponent implements OnInit {
  productos: Producto[] = [];

  categoria: Categoria[] = []; 

  proveedor: Proveedor[] = [];  

  marca: Marca[] = [];
  

  producto: Producto = new Producto();

  

  titulo: string = 'Agregar Usuario';

  //---- parametro para detalle - actualizar
  Id_Producto: number;

  button = document.getElementsByClassName('crud');
  input = document.getElementsByClassName('form-input');

  //------------------------ CAMPOS DE FORMULARIO ---------------------------
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

  //----------- VISIBILIDAD DE MENSAJE DE ERROR DE CAMPOS DE FORMULARIO ----------------
  submitted: boolean = false;

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

  //------------------------ VALIDACION DE FORMULARIO ---------------------------

  createFormControls() {
    this.IdProducto = new FormControl('', Validators.nullValidator);
    this.Nombre = new FormControl('', Validators.required);
    this.Descripcion = new FormControl('', Validators.required);
    this.Indicaciones = new FormControl('', Validators.required);
    this.Marca = new FormControl('', Validators.required);
    this.Precio = new FormControl('', Validators.required);
    this.Serie = new FormControl('', Validators.required);
    this.Stock = new FormControl('', Validators.required);
    this.IdCategoria = new FormControl('', Validators.required);
    this.IdProveedor = new FormControl('', Validators.required);
    this.foto = new FormControl(null);
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        IdProducto: this.IdProducto,
        Nombre: this.Nombre,
        Descripcion: this.Descripcion,
        Indicaciones: this.Indicaciones,
        Marca: this.Marca,
        Precio: this.Precio,
        Serie: this.Serie,
        Stock: this.Stock,
        IdCategoria: this.IdCategoria,
        IdProveedor: this.IdProveedor,
        foto: this.foto,
      }),
    });
  }

  //------------------ RENDERIZADO DE MODAL PARA CRUD DE PRODUCTOS---------------------------------

  openModalCrud(
    targetModal: Component,
    accion: string,
    idProducto?: number
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

      console.log(this.producto.id_producto);
      this.getProducto(idProducto);
      this.getMarca();
      this.getCategoria();
      this.getProveedor();
      for (let j = 0; j < this.input.length; j++) {
        this.input[j].setAttribute('disabled', '');
      }
    } else if (accion == 'editar') {
      this.titulo = 'Actualizar Información';

      this.getProducto(idProducto);
      this.getMarca();
      this.getCategoria();
      this.getProveedor();

      console.log(this.producto.id_producto);
    } else if (accion == 'agregar') {

      this.getMarca();
      this.getCategoria();
      this.getProveedor();      
      this.producto.id_producto = 0;
      this.titulo = 'Registro de Usuario';      
      //this.modalAgregar();
      //this.myform.clearValidators();
    }
  }

  cerrarmodal() {
    this.submitted = false;
    this.modalService.dismissAll();
    this.myform.reset();
    //this.usuarioService.getRegiones().subscribe((ubigeo) => (this.ubigeo = []));
  }

  //---------*********************************************************------------
  //---------*********************************************************------------
  //---------*********************************************************------------
  //---------*********************************************************------------

  //----------------------- COMPARACION DE ID DE CATEGORIA - PROVEEDOR - MARCA -----------
 
  compareMarca(c1: Marca, c2: Marca): boolean {
    //console.log(t1.id_ubigeo + t2.id_ubigeo);

    if ((c1 === null && c2 === null) || (c1 === undefined && c2 === undefined)) {
      return true;
    } else if (c1 === null || c2 === null || c1 === undefined || c2 === undefined)
     return false;
     else{
       return c1.id_marca_pro === c2.id_marca_pro;
     }
  }

  compareCategoria(c1: Categoria, c2: Categoria): boolean {
    //console.log(t1.id_ubigeo + t2.id_ubigeo);

    if ((c1 === null && c2 === null) || (c1 === undefined && c2 === undefined)) {
      return true;
    } else if (c1 === null || c2 === null || c1 === undefined || c2 === undefined)
     return false;
     else{
       return c1.id_categoria_pro === c2.id_categoria_pro;
     }
  }

  compareProveedor(p1: Proveedor, p2: Proveedor): boolean {
    //console.log(t1.id_ubigeo + t2.id_ubigeo);

    if ((p1 === null && p2 === null) || (p1 === undefined && p2 === undefined)) {
      return true;
    } else if(p1 === null || p2 === null || p1 === undefined || p2 === undefined){
      return false;
    }
    
    else {
      return p1.id_proveedor === p2.id_proveedor;}

  }

  //--------------------- VERIFICACION DE DATOS AL DAR SUBMIT AL FORMULARIO ---------------

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
            title: 'Verificar los datos antes de continuar...',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, registrarse',
          })
          .then((result) => {
            if (this.producto.id_producto === 0) {
              if (result.isConfirmed) {
                swal.fire(
                  'Registro Exitoso...!',
                  `${this.producto.nombre} producto agregado correctamente`,
                  'success'
                );
                this.insert();
                this.modalService.dismissAll();
              }
            } else if (
              this.producto.id_producto != 0 &&
              this.producto.id_producto > 0
            ) {
              if (result.isConfirmed) {
                swal.fire(
                  'Update Exitoso...!',
                  `${this.producto.nombre} los datos se actualizaron correctamente`,
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

  //----------------------- CRUD DE PRODUCTOS ---------------------------
  insert(): void {
    this.productoService.insert(this.producto).subscribe((response) => {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
      // this.router.navigate([window.location.reload()]);
    });
  }

  update(): void {
    this.productoService.update(this.producto).subscribe((response) => {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
      // this.router.navigate([window.location.reload()]);
    });
  }

  getProducto(idProducto) {
    this.productoService
      .getProducto(idProducto)
      .subscribe((producto) => (this.producto = producto));
  }

  getMarca() {
    this.productoService
      .getMarca()
      .subscribe((marca) => (this.marca = marca));
  }

  getCategoria() {
    this.productoService
      .getCategoria()
      .subscribe((categoria) => (this.categoria = categoria));
  }

  getProveedor() {
    this.productoService
      .getProveedor()
      .subscribe((proveedor) => (this.proveedor = proveedor));
  }
  //--------------
}
