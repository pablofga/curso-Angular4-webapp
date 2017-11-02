import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
  selector: 'productos-add', 
  templateUrl: '../views/producto-add.html',
  providers:[ProductoService]
})
export class ProductoAddComponent {
        public titulo:string;
        public producto:Producto;
        public errorMessage:any;

        constructor(
          private _productoService:ProductoService,
          private _route:ActivatedRoute,
          private _router:Router
          ){
            this.titulo = "Crear un nuevo producto";
            this.producto = new Producto(0,'','',0,'');
        }

        ngOnInit(){
            console.log('producto-add.component.ts cargado');
        }
        onSubmit(){
          console.log(this.producto);
          this._productoService.addProducto(this.producto).subscribe(
            response=>{
              this.producto=response.producto;
              if(!response.producto){
                alert("error en el servidor");
              }else{
                this._router.navigate(['/productos']);
              }
              /*if(response.code=200){
                console.log('Se ha guardado');
                this._router.navigate(['/productos']);
              }else{
                console.log(response);
              }*/
            },
            error=>{
              this.errorMessage = <any>error;
              if (this.errorMessage != null){
                console.log(this.errorMessage);
              }
            }
           );
        }
}