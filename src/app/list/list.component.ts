import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

@Injectable()
export class ListComponent implements OnInit {

  data = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/fetch').subscribe((res) => { this.data = res.values[0]; });
}

deleteCall(id) {
  console.log(id);
  this.http.post('http://localhost:5000/delete',{ id : id }).subscribe((res) => { console.log(res) });
}
}
