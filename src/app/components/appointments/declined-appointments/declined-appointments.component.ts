import {AfterViewInit, Component, ViewChild, OnInit, Input, ChangeDetectorRef, SimpleChanges, OnChanges} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetAllAppointmentLists, appointments } from 'src/app/_models/AppointmentModel';
import { faCheck, faXmark, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-declined-appointments',
  templateUrl: './declined-appointments.component.html',
  styleUrls: ['./declined-appointments.component.scss']
})
export class DeclinedAppointmentsComponent implements AfterViewInit, OnInit, OnChanges {
  faCheck = faCheck;
  faXmark = faXmark;
  faBell = faBell;


  displayedColumns: string[] = ['patientFullname', 'appointed_time', 'appointed_date', 'medical_reason', 'decline_reason', 'statusName', 'date_created'];
  dataSource!: MatTableDataSource<GetAllAppointmentLists>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() appointmentList: GetAllAppointmentLists[] = [];

  constructor(private dialog: MatDialog,  
              private snackBar: MatSnackBar) {
    
                setTimeout(() => {
                  this.dataSource = new MatTableDataSource(this.appointmentList.filter(x => x.status === 3));
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
      this.dataSource.data = this.appointmentList.filter(x => x.status === 3);
    }
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
