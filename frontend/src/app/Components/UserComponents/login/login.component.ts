import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm : FormGroup;
  invalid:String;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { this.mainForm(); }

  mainForm(){
    this.loginForm = this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
  }
  // Getter to access form control
  get myForm(){
    return this.loginForm.controls;
  }

  
  onLoginSubmit() {

    this.submitted == true;
    if (!this.loginForm.valid) {
      return false;
    }else {
      this.authService.loginUser(JSON.stringify(this.loginForm.value)).subscribe(res =>{
        console.log(res.user,"valueeeeeeeeeeeeeeeeeeeeeeeeeeees")
        if(res.success){
          console.log('logined')
          this.authService.storeUserToken(res.token, res.user);

          if(res.user.type=='candidate')
          console.log(res.user)
          this.router.navigateByUrl('/users/dashboard')

          if(res.user.type=='company')
          this.router.navigateByUrl('/hr/dashboard')

        } else{
          this.invalid=res.msg
          console.log(res.msg)
          this.router.navigateByUrl('/login')
        }
      },(error)=> {
        console.log(error)
      });
    }
  }
}

