
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { jsPDF } from "jspdf";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { appointments } from 'src/app/_models/AppointmentModel';
import { dummy } from './dummy';
import { MedicalRecordData } from 'src/app/_models/MedicalRecordModel';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { UserServiceService } from 'src/app/_services/user/user-service.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent {
 
  pageTitle: string = "Patient Medical Record"
  faPrint = faPrint;

  displayedColumns: string[] = ['medical_reason', 'medical_desc', 'diagnosis', 'physician', 'date_created'];
  dataSource: MatTableDataSource<MedicalRecordData>;

  patientInfo: any = {};
  medicalInfo: any[] = [];
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private titleService: Title, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public auth: AuthService,
    private userService: UserServiceService) {
    this.titleService.setTitle("Sibut Medicare | Medical Record");
    this.dataSource = new MatTableDataSource(this.medicalInfo);
  }
  ngOnInit(): void {
    this.getPatientInfo();
    this.getPatientMedicalInformation();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  async getPatientInfo() {

    try {
      
      const userId = localStorage.getItem('User_Type') === '3' ? localStorage.getItem('User_ID') : this.recordURL;
      const response = await this.userService.userInformation(userId);

      if (!response.success) {
        Swal.fire({
          title: "Something went wrong!",
          text: response.message,
          icon: 'error',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {

          }
        });

        return false;

      }

      this.patientInfo = response.result;
      console.log(this.patientInfo)

      setTimeout(() => {
        this.isLoading = false;
      }, 1500);

      return true;

    } catch (error: any) {

      Swal.fire({
        title: error.message,
        text: error.error,
        icon: 'error',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          // Code to execute if the user confirms the alert
        }
      });

      return false;
    }

  }


  async getPatientMedicalInformation() {

    const response = await this.userService.getPatientMedicalInformation(this.recordURL);

    this.medicalInfo = response.result;
    this.dataSource.data = this.medicalInfo;
    console.log(response);

  }


  get recordURL() {

    const url = window.location.href;
    const parts = url.split("/");
    const recordURL = parts[parts.length - 1];
    return recordURL;

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

  async onPrint() {
    await this.userService.printMedicalRecord(this.recordURL);
  }

}
