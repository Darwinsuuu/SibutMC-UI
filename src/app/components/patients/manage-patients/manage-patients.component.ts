import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { appointments } from 'src/app/_models/AppointmentModel';
import { faCheck, faXmark, faBell } from '@fortawesome/free-solid-svg-icons';
import { PatientList } from 'src/app/_models/PatientModel';
import { patients } from '../patients';
import { UserServiceService } from 'src/app/_services/user/user-service.service';

@Component({
  selector: 'app-manage-patients',
  templateUrl: './manage-patients.component.html',
  styleUrls: ['./manage-patients.component.scss']
})
export class ManagePatientsComponent implements AfterViewInit, OnInit {
  faCheck = faCheck;
  faXmark = faXmark;
  faBell = faBell;
  patientList: PatientList[] = [];
  isLoading: boolean = true;

  displayedColumns: string[] = ['fullname', 'marital_status', 'gender', 'email', 'contact_no'];
  dataSource!: MatTableDataSource<PatientList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,  
              private snackBar: MatSnackBar,
              private userService: UserServiceService) {
                setTimeout(() => {
                  this.dataSource = new MatTableDataSource(this.patientList);
                }, 1000);
  }

  ngOnInit(): void {
    this.getAllPatientInformation()
  }

  ngAfterViewInit() {
    if (this.dataSource && this.patientList && this.patientList.length > 0) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  async getAllPatientInformation() {

    const response = await this.userService.getAllPatientInformation();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    this.patientList = response.result;
    console.log(this.patientList);

  }

}
