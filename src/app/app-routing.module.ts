import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { RecordComponent } from './pages/record/record.component';
import { ActivityLogComponent } from './pages/activity-log/activity-log.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { LogoutComponent } from './components/account/logout/logout.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { authGuard } from './_services/auth/auth.guard';

const routes: Routes = [

  // Accounts
  { path: 'login', component: LoginPageComponent },
  { path: 'login/staff', component: LoginPageComponent },
  { path: 'login/admin', component: LoginPageComponent },
  { path: 'create-account', component: SignupPageComponent },

  // Main Pages
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [authGuard] },
  { path: 'appointment', component: AppointmentsComponent, canActivate: [authGuard] },
  { path: 'patients', component: PatientsComponent, canActivate: [authGuard] },
  { path: 'record/:id', component: RecordComponent, canActivate: [authGuard] },
  { path: 'activity', component: ActivityLogComponent, canActivate: [authGuard] },
  { path: 'account', component: AccountSettingsComponent, canActivate: [authGuard] },

  // Others
  { path: 'logout', component: LogoutComponent, canActivate: [authGuard] },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
