
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
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private userService: UserServiceService) {
    this.dataSource = new MatTableDataSource(dummy);
  }

  ngOnInit(): void {
    this.getPatientInfo()
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
      
      const userId = this.getUserId;
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

      setTimeout(() => {
        this.isLoading = false;
        console.log(this.patientInfo)
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


  get getUserId() {

    const url = window.location.href;
    const parts = url.split("/");
    const userId = parts[parts.length - 1];

    return userId;

  }




  onPrint(div: any) {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: 'px',
      format: 'a4',
    });

    let marginTop = 0;
    let marginLeft = 0;
    let fontFamily = 'helvetica';

    var img = new Image()
    img.src = '../../../assets/images/logo.png'
    doc.addImage(img, 'png', 20, marginTop += 16, 50, 35);
    doc.setFontSize(16).setTextColor('#3f51b5').setFont('helvetica', 'bold').text("Barangay Medicare", 70, 33);
    doc.setFontSize(9).setTextColor('#414141').text("Brgy. Sibut, San Jose, Nueva Ecija", 70, 44);
    doc.html("<h1>test</h1>")

    doc.save("a4.pdf");
  }


}
