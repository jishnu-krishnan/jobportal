import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Components/UserComponents/signup/signup.component';
import { LoginComponent } from './Components/UserComponents/login/login.component';
import { VacancyComponent } from './Components/HrComponents/vacancy/vacancy.component';
import { SignupHrComponent } from './Components/HrComponents/signup-hr/signup-hr.component';
import { HrDashboardComponent } from './Components/HrComponents/hr-dashboard/hr-dashboard.component';
import { UserDashboardComponent } from './Components/UserComponents/user-dashboard/user-dashboard.component';
import { UserNavbarComponent } from './Components/UserComponents/user-navbar/user-navbar.component';
import { HrNavbarComponent } from './Components/HrComponents/hr-navbar/hr-navbar.component';
import { AddButtonComponent } from './Components/HrComponents/add-button/add-button.component';
import { HomeComponent } from './Components/UserComponents/home/home.component';
import { ViewApplicationsComponent } from './Components/HrComponents/view-applications/view-applications.component';
import { AppliedJobsComponent } from './Components/UserComponents/applied-jobs/applied-jobs.component';
import { SkillComponent } from './Components/UserComponents/skill/skill.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    VacancyComponent,
    SignupHrComponent,
    HrDashboardComponent,
    UserDashboardComponent,
    UserNavbarComponent,
    HrNavbarComponent,
    AddButtonComponent,
    HomeComponent,
    ViewApplicationsComponent,
    AppliedJobsComponent,
    SkillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent, AuthGuard, AuthService]
})
export class AppModule { }
