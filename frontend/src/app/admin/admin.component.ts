import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public router: Router) {

    const admin = JSON.parse(sessionStorage.getItem('admin'))
    if (admin == null) {
      this.router.navigate([''])
    }

  }

  ngOnInit(): void {
  }

  odjaviSe(){
    sessionStorage.clear()
    this.router.navigate([''])
  }

}
