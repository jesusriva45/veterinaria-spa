import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';

import { Producto } from '../../../models/producto';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProCategoria } from 'src/app/models/pro-categoria';
import { Proveedor } from 'src/app/models/proveedor';
import { Marca } from 'src/app/models/marca';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css'],
})
export class CrudProductoComponent implements OnInit {
  productos: Producto[] = [];

  categoria: ProCategoria[];

  proveedor: Proveedor[];

  marca: Marca[];

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

  //----------------------------------------------------------

  //---------------------------------------------------------

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.titulo;
  }

  ngOnInit(): void {
    this.productoService
      .getProductos()
      .subscribe((productos) => (this.productos = productos));
    this.getMarca();
  }

  //------------------------ EDITOR DE TEXTO - DESCRIPCION ----------------------

  ProDescrip: string;
  ProNom: string;
  ProMarca: string;
  modalDetalle(producto: Producto) {
    this.getProducto(producto.idproducto);
    this.ProDescrip = `${producto.descripcion}`;
    this.ProNom = `${producto.nombre}`;
    this.ProMarca = `${producto.marca.nombre}`;
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '200px',
    width: '100%',

    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
      { class: 'Algerian', name: 'Algerian' },
      { class: 'MT Extra', name: 'MT Extra' },
      { class: 'Cooper Black', name: 'Cooper Black' },
    ],

    toolbarHiddenButtons: [
      [
        //'undo',
        //'redo',
        //'bold',
        //'italic',
        //'underline',
        //'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        //'indent',
        //'outdent',
        //'insertUnorderedList',
        //'insertOrderedList',
        //'heading',
        //'fontName',
      ],
      [
        //'fontSize',
        //'textColor',
        'backgroundColor',
        'customClasses',
        //'link',
        //'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        //'removeFormat',
        //'toggleEditorMode',
      ],
    ],
  };

  //------------------------ VALIDACION DE FORMULARIO ---------------------------

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
    this.foto = new FormControl('', Validators.required);
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

  modalAgre(producto: Producto) {
    producto.idproducto = 0;
  }

  openModalCrud(targetModal, accion: string, idProducto?: number): void {
    this.createFormControls();
    this.createForm();

    this.modalService.open(targetModal, {
      centered: true,
      animation: true,
      backdropClass: 'modal-backdrop',
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      keyboard: false,
    });

    if (accion == 'detalle') {
      //this.titulo = "Detalles de Usuario"

      console.log(this.producto.idproducto);
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

      console.log(this.producto.idproducto);
    } else if (accion == 'agregar') {
      this.getMarca();
      this.getCategoria();
      this.getProveedor();
      this.producto.idproducto = 0;
      this.titulo = 'Registro de Producto';
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

    if (
      (c1 === null && c2 === null) ||
      (c1 === undefined && c2 === undefined)
    ) {
      return true;
    } else if (
      c1 === null ||
      c2 === null ||
      c1 === undefined ||
      c2 === undefined
    )
      return false;
    else {
      return c1.idmarca === c2.idmarca;
    }
  }

  compareCategoria(c1: ProCategoria, c2: ProCategoria): boolean {
    //console.log(t1.id_ubigeo + t2.id_ubigeo);

    if (
      (c1 === null && c2 === null) ||
      (c1 === undefined && c2 === undefined)
    ) {
      return true;
    } else if (
      c1 === null ||
      c2 === null ||
      c1 === undefined ||
      c2 === undefined
    )
      return false;
    else {
      return c1.idcategoria === c2.idcategoria;
    }
  }

  compareProveedor(p1: Proveedor, p2: Proveedor): boolean {
    //console.log(t1.id_ubigeo + t2.id_ubigeo);

    if (
      (p1 === null && p2 === null) ||
      (p1 === undefined && p2 === undefined)
    ) {
      return true;
    } else if (
      p1 === null ||
      p2 === null ||
      p1 === undefined ||
      p2 === undefined
    ) {
      return false;
    } else {
      return p1.id_proveedor === p2.id_proveedor;
    }
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
            if (this.producto.idproducto === 0) {
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
              this.producto.idproducto != 0 &&
              this.producto.idproducto > 0
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

  delete(producto: Producto): void {
    swal
      .fire({
        title: `Seguro desea eliminar el producto ${producto.nombre}... ?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.productoService
            .delete(producto.idproducto)
            .subscribe((response) => {
              this.productos = this.productos.filter(
                (prod) => prod != producto
              );
              swal.fire(
                `El Producto ${this.producto.nombre} ha sido eliminado...!`,
                'success'
              );
            });
        }
      });
  }

  getProducto(idProducto) {
    this.productoService
      .getProducto(idProducto)
      .subscribe((producto) => (this.producto = producto));
  }

  getMarca() {
    this.productoService.getMarca().subscribe((marca) => (this.marca = marca));
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
