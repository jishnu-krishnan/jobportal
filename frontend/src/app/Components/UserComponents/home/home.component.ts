import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any=[];
  post :any=[];
  profile :String;
  searchText:String;
  limit:Number;
  temp:Number;
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.limit=8
    this.router.navigateByUrl('/')
    this.authService.getSuggestionPost().subscribe(res => {
      this.post=res
      this.temp=res.length
      console.log('valuessss',this.post)
    },(error)=> {
      console.log(error)
    }); 

    const user= JSON.parse(localStorage.getItem('user'))
    
    if(user.type=='candidate'){
      this.router.navigateByUrl('/users/dashboard')
    }else if(user.type=='company'){
      this.router.navigateByUrl('/hr/dashboard')
    }

    
  }

}
