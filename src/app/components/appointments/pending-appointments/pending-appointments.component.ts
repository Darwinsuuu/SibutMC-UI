import { AfterViewInit, Component, ViewChild, OnInit, Input, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetAllAppointmentLists } from 'src/app/_models/AppointmentModel';
import { faCheck, faXmark, faBell } from '@fortawesome/free-solid-svg-icons';
import { ModalDeclineAppointmentComponent } from '../../modal/modal-decline-appointment/modal-decline-appointment.component';
import { ModalApproveAppointmentComponent } from '../../modal/modal-approve-appointment/modal-approve-appointment.component';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { AppointmentService } from 'src/app/_services/appointment/appointment.service';
import { SmsServiceService } from 'src/app/_services/semaphore/sms-service.service';

@Component({
  selector: 'app-pending-appointments',
  templateUrl: './pending-appointments.component.html',
  styleUrls: ['./pending-appointments.component.scss']
})
export class PendingAppointmentsComponent implements AfterViewInit, OnInit, OnChanges {

  faCheck = faCheck;
  faXmark = faXmark;
  faBell = faBell;


  displayedColumns: string[] = localStorage.getItem('User_Type') === '3' ? ['patientFullname', 'appointed_time', 'appointed_date', 'medical_reason', 'statusName', 'date_created'] : ['patientFullname', 'appointed_time', 'appointed_date', 'medical_reason', 'statusName', 'date_created', 'action'];
  dataSource!: MatTableDataSource<GetAllAppointmentLists>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() appointmentList: GetAllAppointmentLists[] = [];

  constructor(private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private appointmentService: AppointmentService,
    private semaphoreService: SmsServiceService) {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.appointmentList.filter(x => x.status === 1));
    }, 1000);

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if (this.dataSource && this.appointmentList && this.appointmentList.length > 0) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appointmentList'] && !changes['appointmentList'].firstChange) {
      // Update dataSource when appointmentList changes
      setTimeout(() => {
        this.dataSource.data = this.appointmentList.filter(x => x.status === 1);
      }, 1000);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  approveAppointment(id: number) {

    let patientInfo = this.appointmentList.find(x => x.appointment_id === id);


    let credentials = {
      fullname: patientInfo?.patient_fullname.toUpperCase(),
      contact_no: patientInfo?.contact_no,
      date: patientInfo?.appointed_date,
      time: patientInfo?.appointed_time,
    }

    this.dialog.open(ModalApproveAppointmentComponent, {
      data: { appointmentId: id },
      height: "fit-content",
      maxHeight: "calc(100vh - 10px)"
    }).afterClosed().subscribe((res: any) => {

      if (res) {

        credentials.time = this.convertTo12HourFormat(res.time);

        // api call here
        this.getAllAppointments();
        this.semaphoreService.sendApproveAppointmentMessage(credentials);

        this.snackBar.open("Successfully approved!", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ['success-snackbar']
        })
      }

    })



  }


  declineAppointment(id: number) {

    let patientInfo = this.appointmentList.find(x => x.appointment_id === id);


    this.dialog.open(ModalDeclineAppointmentComponent, {
      data: { patientName: patientInfo?.patient_fullname.toUpperCase() },
      height: "fit-content",
      maxHeight: "calc(100vh - 10px)"
    }).afterClosed().subscribe((res: any) => {

      if (res) {

        let data = {
          id: id,
          reason: res
        }

        let credentials = {
          fullname: patientInfo?.patient_fullname.toUpperCase(),
          contact_no: patientInfo?.contact_no,
          reason: res
        }


        this.appointmentService.declineAppointment(data);
        this.semaphoreService.sendDeclineMsg(credentials);
        this.getAllAppointments();

        // api call here
        this.snackBar.open("Appointment was succefully declined!", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ['success-snackbar']
        })
      }
    })
    
  }



  async getAllAppointments() {
    var response =  await this.appointmentService.getAllAppointments();
    if(response.success) {
      this.appointmentList = response.result;
      setTimeout(() => {
        this.dataSource.data = this.appointmentList.filter(x => x.status === 1);
      }, 1000);
    }
  }

  
  
  convertTo12HourFormat(timeString: any) {
    // Parse the input time string to extract hours and minutes
    const [hours, minutes] = timeString.split(':').map(Number);
  
    // Check if the time is in the AM or PM period
    const period = hours >= 12 ? 'PM' : 'AM';
  
    // Convert the hours to 12-hour format
    const hours12 = hours % 12 || 12;
  
    // Create the formatted time string
    const formattedTime = `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  
    return formattedTime;
  }


}
