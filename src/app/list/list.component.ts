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

  async ngOnInit() {
    const wait = this.http.get('http://localhost:5000/fetch').toPromise();
    wait.then((data) => {
      this.data = data.values[0];
      let val = 6;
      console.log(this.data);
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
    }).catch((e) => {
      console.log(e);
    });
}

showButton() {
  if (this.data.length <= this.index)
  {
    return false;
  }
  else {
    return true;
  }
}

openList(event) {
    this.show = !this.show;
}

deleteCall(id) {
  console.log(id);
  this.http.post('http://localhost:5000/delete',{ id : id }).subscribe((res) => { console.log(res) });
}
}
