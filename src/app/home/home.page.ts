import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { RedirectorService } from '../redirector.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  redirectForm: FormGroup;
  urlControl: FormControl;
  redirectControl: FormControl;

  url = '';
  redirect = true;
  serverError = '';
  availableRedirectUrlsError = '';

  constructor(
    public formBuilder: FormBuilder, private redirectorService: RedirectorService
  ) { }

  ValidateUrl(control: AbstractControl) {
    const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
    const validUrlRegExp = new RegExp(urlPattern);
    const isValid = control.value ? validUrlRegExp.test(control.value) : true;

    if (!isValid) {
      return { validUrl: true };
    }
    return null;
  }

  ngOnInit() {
    this.urlControl = new FormControl(this.url, [this.ValidateUrl]);
    this.redirectControl = new FormControl(this.redirect);

    this.redirectForm = this.formBuilder.group({
      url: this.urlControl,
      redirect: this.redirectControl
    });

    this.redirectorService.getMessage().subscribe(data => {
      this.availableRedirectUrlsError = data.url;
    });
  }

  notifyServer(formData: any) {
    this.serverError = '';
    this.availableRedirectUrlsError = '';
    this.redirectorService.sendMessage(formData, (data) => {
      return new Promise((resolve, reject) => {
        if (data.error) {
            this.serverError = data.error;
            resolve('');
            return;
        }
        window.location.assign(data.url);
        resolve('');
    });
    });
  }

}
