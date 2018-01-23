import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import {GLOBAL } from '../services/global';

@Component({
  selector: 'productos-add',
  templateUrl: '../views/producto-add.html',
  providers: [ProductoService]
})
export class ProductoAddComponent {
    public titulo: string;
    public producto: Producto;
    public errorMessage: any;
    public filesToUpload;
    public resultUpload;

    constructor(
      private _productoService: ProductoService,
      private _route: ActivatedRoute,
      private _router: Router
      ) {
        this.titulo = 'Crear un nuevo producto';
        this.producto = new Producto(0, '', '', 0, '');
        console.log('--------------1');
        console.log(this.filesToUpload);
      }

    ngOnInit() {
        console.log('producto-add.component.ts cargado');
    }

    onSubmit() {
      console.log(this.producto);
      console.log(GLOBAL.url + 'upload-file');
      console.log('--------------2');
      console.log(this.filesToUpload);
      // Si hay imagen se sube primero
      if (this.filesToUpload !== undefined && this.filesToUpload.length >= 1) {
                this._productoService.makeFileRequest(GLOBAL.url + 'upload-file', [], this.filesToUpload).then((result) => {
                  console.log(result);
                  this.resultUpload = result;
                  this.producto.imagen = this.resultUpload.filename;
                  this.saveProducto();
                }, (error) => {
                  console.log(error);
                }
            );
      } else {
        // si no hay imagen seleccionada se guarda el producto directamente
        this.saveProducto();
      }
  }
  saveProducto() {
  this._productoService.addProducto(this.producto).subscribe(
        response => {
          this.producto = response.producto;
          if (!response.producto) {
            alert('error en el servidor');
          } else {
            this._router.navigate(['/productos']);
          }
         // TODO otro punto a revisar
          /*if(response.code=200){
            console.log('Se ha guardado');
            this._router.navigate(['/productos']);
          }else{
            console.log(response);
          }*/
        },
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
          }
        }
      );
    }

    fileChangeEvent(fileInput: any) {
      this.filesToUpload = <Array<File>>fileInput.target.files;
      console.log(this.filesToUpload);
    }
  }
