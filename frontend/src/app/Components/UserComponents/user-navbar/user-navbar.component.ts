import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  
  onLogoutClick(){
    if(window.confirm('Are you sure to exit?')){
      this.authService.logout();
      this.router.navigateByUrl('/login')
    }  
  }

}
