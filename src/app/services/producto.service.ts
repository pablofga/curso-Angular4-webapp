import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Producto } from '../models/producto';
import { GLOBAL } from './global';

@Injectable()
export class ProductoService{
    public url:string;

    constructor(private _http:Http){
        this.url=GLOBAL.url;
    }
    getProductos(){
       //return 'Texto desde el servicio';
       return this._http.get(this.url+'productos').map(res => res.json());
    }
    addProducto(producto:Producto){
        let json = JSON.stringify(producto);
        let params = json;
        //let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        let headers = new Headers({'Content-Type':'application/json'});

        return this._http.post(this.url+'producto',params,{headers:headers}).map(res => res.json());
    }
}