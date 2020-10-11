import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

@Injectable()
export class RegistrationComponent implements OnInit {

  head : string;
  description : string;
  image: any;
  form: FormGroup;
  
  constructor(private http: HttpClient,public fb: FormBuilder) { 

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required]}),
      'description': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: [Validators.required]})
    });
  }

  createFormData(event) {
    this.image = <File>event.target.files[0];
    this.form.patchValue({image: this.image});
    this.form.get('image').updateValueAndValidity();
  }

  sendRequest() {
    const fd = new FormData();
    fd.append('image',this.form.value.image);
    fd.append('title',this.form.value.title);
    fd.append('description',this.form.value.description);
    this.http.post('http://localhost:5000/upload',fd).subscribe(res => console.log(res));
    this.form.patchValue({title: '',description: '',image: null});
  }
}
