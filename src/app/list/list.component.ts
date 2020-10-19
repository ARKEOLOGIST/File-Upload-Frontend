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
    this.http.get('http://backend/fetch.php').subscribe((res: any) => { 
    this.data = res.response;
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
    this.afterFunction(this.data);
  });
}

afterFunction(values) {
  let f = this;
  this.interval = setInterval(function() {
    if (values.length > 6 && f.index < values.length)
    {
      f.display.splice(0,1);
      f.display.push(values[f.index]);
      f.index++;
    } 
  },30000);
}

showButton() {
  if (this.data.length <= 6) {
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
  this.http.get('http://backend/delete.php?id='+id).subscribe((res: any) => { 
    
  });
}
}
