
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { jsPDF } from "jspdf";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { appointments } from 'src/app/_models/AppointmentModel';
import { dummy } from './dummy';
import { MedicalRecordData } from 'src/app/_models/MedicalRecordModel';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,  
              private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(dummy);
  }

  ngOnInit(): void {
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
    doc.addImage(img, 'png', 20, marginTop+=16, 50, 35);
    doc.setFontSize(16).setTextColor('#3f51b5').setFont('helvetica', 'bold').text("Barangay Medicare", 70, 33);
    doc.setFontSize(9).setTextColor('#414141').text("Brgy. Sibut, San Jose, Nueva Ecija", 70, 44);
    doc.html("<h1>test</h1>")

    doc.save("a4.pdf");
  }


}
