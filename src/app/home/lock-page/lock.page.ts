import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, ViewChild } from '@angular/core';
import { UrlConstants } from 'src/app/constants/UrlConstants';

@Component({
  selector: 'app-lock',
  templateUrl: 'lock.page.html',
  styleUrls: ['lock.page.scss'],
})
export class LockPage{

  showLoading = false;

  responseText: string = ''
  disabledTextArea = false
  disabledTxtFileInput = false
  disabledFileInput = false
  
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @ViewChild('txtFileInput', { static: false }) txtFileInput!: ElementRef;

  constructor(private http: HttpClient){}

  encryptData(publicKeyPair: string, message: string) {

    this.showLoading = true
    let selectedFile = this.fileInput.nativeElement.files[0];
    if(!selectedFile){
      selectedFile = this.txtFileInput.nativeElement.files[0];
    }

    if(selectedFile){

      const url = UrlConstants.BASE_URL + '/rsa/encrypt/file';

      let formData = new FormData();
      formData.append('publicKeyPair', publicKeyPair)
      formData.append('file', selectedFile)

      this.http.post(url, formData, { responseType: 'blob' }).subscribe(blob => {
        this.showLoading = false
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