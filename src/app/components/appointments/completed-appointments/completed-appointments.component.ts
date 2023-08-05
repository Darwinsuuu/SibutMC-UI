import {AfterViewInit, Component, ViewChild, OnInit, Input, ChangeDetectorRef, SimpleChanges, OnChanges} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { appointmentList } from '../dummyAppointments';
import { GetAllAppointmentLists, appointments } from 'src/app/_models/AppointmentModel';
import { faCheck, faXmark, faBell } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-completed-appointments',
  templateUrl: './completed-appointments.component.html',
  styleUrls: ['./completed-appointments.component.scss']
})

export class CompletedAppointmentsComponent implements AfterViewInit, OnInit, OnChanges {
  faCheck = faCheck;
  faXmark = faXmark;
  faBell = faBell;


  displayedColumns: string[] = ['patientFullname', 'appointed_time', 'appointed_date', 'medical_reason', 'statusName', 'date_created'];
  dataSource!: MatTableDataSource<GetAllAppointmentLists>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() appointmentList: GetAllAppointmentLists[] = [];

  constructor(private dialog: MatDialog,  
              private snackBar: MatSnackBar) {
                setTimeout(() => {
                  this.dataSource = new MatTableDataSource(this.appointmentList.filter(x => x.status === 4));
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
        this.dataSource = new MatTableDataSource(this.appointmentList.filter(x => x.status === 4));
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
