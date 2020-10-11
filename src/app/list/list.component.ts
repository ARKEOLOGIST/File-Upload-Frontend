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
  display = [];
  index = 0;
  interval: any;
  show = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/fetch').subscribe((res) => { this.data = res.values[0];
    let val = 6;
    if (this.data.length > 6)
    {
      while (val !== 0)
      {
        this.display.push(this.data[this.index]);
        this.index++;
        val--;
      }
    } else {
      val = this.data.length;
      while (val !== 0)
      {
        this.display.push(this.data[this.index]);
        this.index++;
        val--;
      }
    }  
    this.afterFunction();
  });
}

afterFunction() {
  this.interval = setInterval(function() {
    if (this.data.length > 6 && this.index <= this.data.length)
    {
      this.display.splice(0,1);
      this.display.push(this.data[this.index]);
      this.index++;
    }  
  },3000);
}

showButton() {
  if (this.data.length < 6) {
    return false;
  }
  else {
    return true;
  }
}

openList(event) {
    event.preventDefault();
    this.show = !this.show;
}

deleteCall(id) {
  console.log(id);
  this.http.post('http://localhost:5000/delete',{ id : id }).subscribe((res) => { console.log(res) });
}
}
