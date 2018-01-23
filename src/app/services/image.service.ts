import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Image } from '../models/image';
import { GLOBAL } from './global';

@Injectable()
export class ImageService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }
    addImage(image: Image) {
        let json=JSON.stringify(image);
        let params = json;
        let headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url + 'image', params, {headers: headers}).map(res => res.json());
    }
}