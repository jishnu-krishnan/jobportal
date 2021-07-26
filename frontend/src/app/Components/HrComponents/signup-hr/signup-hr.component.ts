import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-signup-hr',
  templateUrl: './signup-hr.component.html',
  styleUrls: ['./signup-hr.component.css']
})
export class SignupHrComponent implements OnInit {
  submitted = false;
  hrRegForm : FormGroup;
  found: String;
  constructor(
    public fb: FormBuilder,
    private authService : AuthService,
    private router :Router,
  ) { this.mainForm(); }

  mainForm(){
    this.hrRegForm = this.fb.group({
      password:['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      name:['',[Validators.required]],
      loc:['',[Validators.required]],
      industryType:['',[Validators.required]],
    })
  }

  // Getter to access form control
  get myForm(){
    return this.hrRegForm.controls;
  }
  ngOnInit(): void {
  }


  onRegisterSubmit(){
    this.submitted=true;
    if(!this.hrRegForm.valid){
      return false;
    }else{
        this.authService.registerCompany(JSON.stringify(this.hrRegForm.value)).subscribe(res=>{
          if(res.success){
            this.authService.storeUserToken(res.token, res.user);
            console.log('User Successfully Registered');
            this.router.navigateByUrl('/hr/dashboard')
          }else{
            this.found=res.msg
            this.router.navigateByUrl('/register')
          }
          },(error)=>{
            console.log(error)
        });
    }
  }

}
