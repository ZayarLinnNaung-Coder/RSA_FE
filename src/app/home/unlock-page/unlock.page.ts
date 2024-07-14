import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, ViewChild } from '@angular/core';
import { UrlConstants } from 'src/app/constants/UrlConstants';

@Component({
  selector: 'app-unlock',
  templateUrl: 'unlock.page.html',
  styleUrls: ['unlock.page.scss'],
})
export class UnlockPage{

  responseText: string = ''
  
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(private http: HttpClient){}

  decryptData(privateKeyPair: string, message: string) {

    let selectedFile = this.fileInput.nativeElement.files[0];
    if(selectedFile){

      const url = UrlConstants.BASE_URL + '/rsa/decrypt/file';

      let formData = new FormData();
      formData.append('privateKeyPair', privateKeyPair)
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
      formData.append('privateKeyPair', privateKeyPair)
      formData.append('message', message)

      this.http.post(UrlConstants.BASE_URL + "/rsa/decrypt/message", formData).subscribe((response: any) => {
        this.responseText = response.message
      })
    }

  }

}