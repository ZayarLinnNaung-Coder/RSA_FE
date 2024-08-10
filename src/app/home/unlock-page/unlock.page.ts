import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, ViewChild } from '@angular/core';
import { UrlConstants } from 'src/app/constants/UrlConstants';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-unlock',
  templateUrl: 'unlock.page.html',
  styleUrls: ['unlock.page.scss'],
})
export class UnlockPage{

  responseText: string = ''
  disabledTextArea = false
  disabledFileInput = false
  disabledTxtFileInput = false

  showLoading = false
  
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @ViewChild('txtFileInput', { static: false }) txtFileInput!: ElementRef;

  constructor(private http: HttpClient){}

  decryptData(privateKeyPair: string, message: string) {

    this.showLoading = true

    let selectedFile = this.fileInput.nativeElement.files[0];
    if(!selectedFile){
      selectedFile = this.txtFileInput.nativeElement.files[0];
    }

    if(selectedFile){

      const url = UrlConstants.BASE_URL + '/rsa/decrypt/file';

      let formData = new FormData();
      formData.append('privateKeyPair', privateKeyPair)
      formData.append('file', selectedFile)

      // this.http.post(url, formData, { responseType: 'blob' }).subscribe(blob => {
      //   this.showLoading = false
      //   const url = window.URL.createObjectURL(blob);
      //   const a = document.createElement('a');
      //   a.href = url;
      //   a.download = selectedFile.name;
      //   document.body.appendChild(a);
      //   a.click();
      //   document.body.removeChild(a);
      // })


      this.http.post(url, formData, { responseType: 'blob' }).subscribe(blob => {
        this.showLoading = false
        saveAs(blob, selectedFile.name);
      })
    } else {

      let formData = new FormData();
      formData.append('privateKeyPair', privateKeyPair)
      formData.append('message', message)

      this.http.post(UrlConstants.BASE_URL + "/rsa/decrypt/message", formData).subscribe((response: any) => {
        this.responseText = response.message
        this.showLoading = false
      })
    }

  }


  changeTextArea(message: string) {
    const result = (message != '')
    this.disabledFileInput = result
    this.disabledTxtFileInput = result
  }

  changeTxtFileInput() {
    const result = this.txtFileInput.nativeElement.files.length != 0
    this.disabledTextArea = result
    this.disabledFileInput = result
  }

  changeFileInput() {
    const result = this.fileInput.nativeElement.files.length != 0
    this.disabledTextArea = result
    this.disabledTxtFileInput = result
  }

}