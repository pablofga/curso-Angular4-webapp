import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { ImageService } from '../services/image.service';
import { Image } from '../models/image';

@Component({
  selector: 'image-add', 
  templateUrl: '../views/image-add.html',
  providers:[ImageService]
})
export class ImageAddComponent implements OnInit{
        public titulo:string;
        public image:Image;
        public errorMessage:any;

        constructor(
          private _imageService:ImageService,
          private _route:ActivatedRoute,
          private _router:Router
          ){
            this.titulo = "Cargar imagen";
        }

        ngOnInit(){
            console.log('image-add.component.ts cargado');
            this.image = new Image('','','');
        }
        onSubmit(){
          console.log(this.image);
          this._imageService.addImage(this.image).subscribe(
            response=>{
              this.image=response.image;
              if(!response.image){
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