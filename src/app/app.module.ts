import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { NewEmployeeComponent } from './components/employee/new-employee/new-employee.component';
import { ModalArchiveEmployeeComponent } from './components/modal/modal-archive-employee/modal-archive-employee.component'  
import { ModalTermsConditionsComponent } from './components/modal/modal-terms-conditions/modal-terms-conditions.component';
import { ModalForgotPasswordComponent } from './components/modal/modal-forgot-password/modal-forgot-password.component';
import { ManageEmployeeComponent } from './components/employee/manage-employee/manage-employee.component';
import { ModalSignupOtpComponent } from './components/modal/modal-signup-otp/modal-signup-otp.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { ModalEditEmployeeComponent } from './components/modal/modal-edit-employee/modal-edit-employee.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { PendingAppointmentsComponent } from './components/appointments/pending-appointments/pending-appointments.component';
import { CompletedAppointmentsComponent } from './components/appointments/completed-appointments/completed-appointments.component';
import { AllAppointmentsComponent } from './components/appointments/all-appointments/all-appointments.component';
import { ApprovedAppointmentsComponent } from './components/appointments/approved-appointments/approved-appointments.component';
import { DeclinedAppointmentsComponent } from './components/appointments/declined-appointments/declined-appointments.component';
import { ModalDeclineAppointmentComponent } from './components/modal/modal-decline-appointment/modal-decline-appointment.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { ManagePatientsComponent } from './components/patients/manage-patients/manage-patients.component';
import { ModalApproveAppointmentComponent } from './components/modal/modal-approve-appointment/modal-approve-appointment.component';
import { RecordComponent } from './pages/record/record.component';
import { ActivityLogComponent } from './pages/activity-log/activity-log.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { PersonalInfoComponent } from './components/account/personal-info/personal-info.component';
import { AdditionalInfoComponent } from './components/account/additional-info/additional-info.component';
import { MedicalInfoComponent } from './components/account/medical-info/medical-info.component';
import { LogoutComponent } from './components/account/logout/logout.component';


// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    ModalSignupOtpComponent,
    ModalTermsConditionsComponent,
    ModalForgotPasswordComponent,
    DashboardComponent,
    SidenavComponent,
    HeaderComponent,
    EmployeesComponent,
    ManageEmployeeComponent,
    NewEmployeeComponent,
    ModalArchiveEmployeeComponent,
    ModalEditEmployeeComponent,
    AppointmentsComponent,
    PendingAppointmentsComponent,
    CompletedAppointmentsComponent,
    AllAppointmentsComponent,
    ApprovedAppointmentsComponent,
    DeclinedAppointmentsComponent,
    ModalDeclineAppointmentComponent,
    PatientsComponent,
    ManagePatientsComponent,
    ModalApproveAppointmentComponent,
    RecordComponent,
    ActivityLogComponent,
    AccountSettingsComponent,
    PersonalInfoComponent,
    AdditionalInfoComponent,
    MedicalInfoComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    FontAwesomeModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
