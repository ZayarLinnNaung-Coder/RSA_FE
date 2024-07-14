import { HttpClient } from '@angular/common/http';
import {Component } from '@angular/core';
import { UrlConstants } from 'src/app/constants/UrlConstants';

@Component({
  selector: 'app-generate-key',
  templateUrl: 'generate-key.page.html',
  styleUrls: ['generate-key.page.scss'],
})
export class GenerateKeyPage{
  
  privateKey: string = ''
  publicKey: string = ''

  constructor(private http: HttpClient){}

  generateKeys() {
    this.http.get(UrlConstants.BASE_URL + "/rsa/generate-key").subscribe((response: any) => {
      this.publicKey = response.publicKey
      this.privateKey = response.privateKey
    })
  }

}