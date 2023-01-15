import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private adminService: AdminService, private router:Router) { }

  ngOnInit(): void {
  }

  kor_ime: string
  lozinka: string
  poruka: string

  prijava(){
    this.adminService.prijava(this.kor_ime, this.lozinka).subscribe(res => {
      if (res['flag'] == -1) {
        this.poruka = "Greska na serveru"
        document.getElementById('poruka').style.color = "red"
      } else {
        if (res['flag'] == 0) {
          this.poruka = "Pogresno uneti podaci"
          document.getElementById('poruka').style.color = "red"
        } else {
          sessionStorage.setItem('admin', JSON.stringify(res['admin']))
          this.router.navigate(['admin'])
        }
      }
    })
  }
}
