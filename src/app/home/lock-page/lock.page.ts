import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, ViewChild } from '@angular/core';
import { UrlConstants } from 'src/app/constants/UrlConstants';

@Component({
  selector: 'app-lock',
  templateUrl: 'lock.page.html',
  styleUrls: ['lock.page.scss'],
})
export class LockPage{

  responseText: string = ''
  
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(private http: HttpClient){}

  encryptData(publicKeyPair: string, message: string) {

    let selectedFile = this.fileInput.nativeElement.files[0];
    if(selectedFile){

      const url = UrlConstants.BASE_URL + '/rsa/encrypt/file';


      let formData = new FormData();
      formData.append('publicKeyPair', publicKeyPair)
      formData.append('file', selectedFile)

      console.log(selectedFile)

      this.http.post(url, formData, { responseType: 'blob' }).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = selectedFile.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })

    } else {

      let formData = new FormData();
      formData.append('publicKeyPair', publicKeyPair)
      formData.append('message', message)

      this.http.post(UrlConstants.BASE_URL + "/rsa/encrypt/message", formData).subscribe((response: any) => {
        this.responseText = response.message
      })
    }

  }

}