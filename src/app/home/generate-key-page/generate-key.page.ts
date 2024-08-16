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
  
  ionViewDidEnter(){
    this.publicKey = localStorage.getItem('publicKey') as string
    this.privateKey = localStorage.getItem('privateKey') as string
  }

  generateKeys() {
    this.http.get(UrlConstants.BASE_URL + "/rsa/generate-key").subscribe((response: any) => {
      this.publicKey = response.publicKey
      this.privateKey = response.privateKey

      localStorage.setItem('publicKey', this.publicKey)
      localStorage.setItem('privateKey', this.privateKey)
    })
  }

}