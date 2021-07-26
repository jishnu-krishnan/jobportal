import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted = false;
  userRegForm : FormGroup;
  found: String;
  gender: String;

  constructor(
    public fb: FormBuilder,
    private authService : AuthService,
    private router :Router,
  ) { this.mainForm(); }

  mainForm(){
    this.userRegForm = this.fb.group({
      mail: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      username:['',[Validators.required]],
      phone:['',[Validators.required]],
      gender:['',[Validators.required]],
    })
  }

  // Getter to access form control
  get myForm(){
    return this.userRegForm.controls;
  }
  ngOnInit(): void {
  }

  onRegisterSubmit(){
    this.submitted=true;
    if(!this.userRegForm.valid){
      return false;
    }else{
        this.authService.registerUser(JSON.stringify(this.userRegForm.value)).subscribe(res=>{
          if(res.success){
            this.authService.storeUserToken(res.token, res.user);
            console.log('User Successfully Registered');
            this.router.navigateByUrl('/users/dashboard')
          }else{
            console.log('Somethings wrong');
            this.found=res.msg
            this.router.navigateByUrl('/register')
          }
          },(error)=>{
            console.log(error)
        });
    }
  }
}
