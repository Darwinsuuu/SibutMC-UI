import { AfterViewInit, Component, ViewChild, OnInit, Input, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetAllAppointmentLists } from 'src/app/_models/AppointmentModel';
import { faCheck, faXmark, faBell } from '@fortawesome/free-solid-svg-icons';
import { ModalDeclineAppointmentComponent } from '../../modal/modal-decline-appointment/modal-decline-appointment.component';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { AppointmentService } from 'src/app/_services/appointment/appointment.service';
import { SmsServiceService } from 'src/app/_services/semaphore/sms-service.service';
import Swal from 'sweetalert2';
import { ModalCompleteAppointmentComponent } from '../../modal/modal-complete-appointment/modal-complete-appointment.component';


@Component({
  selector: 'app-approved-appointments',
  templateUrl: './approved-appointments.component.html',
  styleUrls: ['./approved-appointments.component.scss']
})
export class ApprovedAppointmentsComponent implements AfterViewInit, OnInit, OnChanges {
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
      this.dataSource = new MatTableDataSource(this.appointmentList.filter(x => x.status === 2));
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
        this.dataSource.data = this.appointmentList.filter(x => x.status === 2);
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


  completeAppointment(id: number) {

    let patientInfo = this.appointmentList.find(x => x.appointment_id === id);

    this.dialog.open(ModalCompleteAppointmentComponent, {
      data: { patientName: patientInfo?.patient_fullname.toUpperCase() },
      width: "600px",
      height: "fit-content",
      maxHeight: "calc(100vh - 10px)"
    }).afterClosed().subscribe((res: any) => { 

      if(res) {

        let data = { 
          appointmentId: patientInfo?.appointment_id, 
          userRole: this.auth.getUserRole(), 
          patientName: patientInfo?.patient_fullname, 
          diagnosis: res 
        }

        this.appointmentService.completeAppointment(data);
        setTimeout(() => {      
          this.getAllAppointments();
        }, 500);

        this.snackBar.open("Appointment completed!", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ['success-snackbar']
        })
      }

    });

    // // api call here
    // Swal.fire({
    //   title: 'Complete Appointment',
    //   text: "Are you sure you want this appointment to complete?",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes'
    // }).then((result) => {
    //   if (result.isConfirmed) {

       

    //     // completeAppointment
       

    //   }
    // })



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
          reason: res,
          patientName: patientInfo?.patient_fullname.replace(/\b\w/g, (match) => match.toUpperCase()),
          userRole: this.auth.getUserRole()
        }

        let credentials = {
          fullname: patientInfo?.patient_fullname.replace(/\b\w/g, (match) => match.toUpperCase()),
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


  notifyPatientAppointment(id: number) {

    let patientInfo = this.appointmentList.find(x => x.appointment_id === id);

    let credentials = {
      fullname: patientInfo?.patient_fullname.replace(/\b\w/g, (match) => match.toUpperCase()),
      contact_no: patientInfo?.contact_no,
      date: patientInfo?.appointed_date,
      time: this.convertTo12HourFormat(patientInfo?.appointed_time),
    }

    let data = {
      patientName: patientInfo?.patient_fullname.replace(/\b\w/g, (match) => match.toUpperCase()),
      userRole: this.auth.getUserRole()
    }

    Swal.fire({
      title: 'Send Reminder',
      text: "Are you sure you want to send a reminder to " + patientInfo?.patient_fullname.replace(/\b\w/g, (match) => match.toUpperCase()) + "?",
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#d33',
      // cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {

        this.appointmentService.notifyPatientAppointment(data);
        this.semaphoreService.sendNotificationMsg(credentials);

        this.snackBar.open("Reminder was sent to the patient", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ['success-snackbar']
        })
      }
    })





  }


  async getAllAppointments() {
    var response = await this.appointmentService.getAllAppointments();
    if (response.success) {
      console.log("======================")
      console.log(response.success)
      console.log("======================")
      this.appointmentList = response.result;
      console.log(this.appointmentList)
      setTimeout(() => {      
        this.dataSource = new MatTableDataSource(this.appointmentList.filter(x => x.status === 2));
      }, 1500);
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
