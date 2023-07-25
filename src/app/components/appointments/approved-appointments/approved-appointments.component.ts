import {AfterViewInit, Component, ViewChild, OnInit, Input, ChangeDetectorRef, SimpleChanges, OnChanges} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetAllAppointmentLists } from 'src/app/_models/AppointmentModel';
import { faCheck, faXmark, faBell } from '@fortawesome/free-solid-svg-icons';
import { ModalDeclineAppointmentComponent } from '../../modal/modal-decline-appointment/modal-decline-appointment.component';
import { AuthService } from 'src/app/_services/auth/auth.service';

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
              private auth: AuthService) {
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


  approveAppointment(id: number) {

    // api call here

    this.snackBar.open("Appointment completed!", "", {
      duration: 3000,
      verticalPosition: "top",
      panelClass: ['success-snackbar']
    })
    
  }


  declineAppointment(id: number) {

    let name = this.appointmentList.find(x => x.appointment_id === id)?.patient_fullname;

    this.dialog.open(ModalDeclineAppointmentComponent, {
      data: { patientName: name },
      height: "fit-content",
      maxHeight: "calc(100vh - 10px)"
    }).afterClosed().subscribe((res: any) => {
      if(res) {
        let reason = res;
        
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

    this.snackBar.open("Reminder was sent to the patient", "", {
      duration: 3000,
      verticalPosition: "top",
      panelClass: ['success-snackbar']
    })

  }



}
