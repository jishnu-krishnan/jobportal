import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './Components/UserComponents/signup/signup.component';
import { LoginComponent } from './Components/UserComponents/login/login.component';
import { VacancyComponent } from './Components/HrComponents/vacancy/vacancy.component';
import { SignupHrComponent } from './Components/HrComponents/signup-hr/signup-hr.component';
import { HrDashboardComponent } from './Components/HrComponents/hr-dashboard/hr-dashboard.component';
import { UserDashboardComponent } from './Components/UserComponents/user-dashboard/user-dashboard.component';
import { HomeComponent } from './Components/UserComponents/home/home.component';
import { ViewApplicationsComponent } from './Components/HrComponents/view-applications/view-applications.component'
import { AppliedJobsComponent } from './Components/UserComponents/applied-jobs/applied-jobs.component';
import { SkillComponent } from './Components/UserComponents/skill/skill.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [

  {path:'', component: HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'users/register',component:SignupComponent},
  {path:'users/dashboard', component:UserDashboardComponent},
  {path:'hr/register', component:SignupHrComponent},
  {path:'hr/dashboard',component:HrDashboardComponent}, 
  {path:'hr/vacancy',component:VacancyComponent}, 
  {path:'hr/vacancy/view/:id',component:ViewApplicationsComponent},
  {path:'users/skill',component:SkillComponent},
  {path:'users/request',component:AppliedJobsComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
