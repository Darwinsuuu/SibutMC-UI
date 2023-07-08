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

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'create-account', component: SignupPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'appointment', component: AppointmentsComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'record/:id', component: RecordComponent },
  { path: 'activity', component: ActivityLogComponent },
  { path: 'account', component: AccountSettingsComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
