import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { staffList } from './dummy';
import { EmployeeList } from 'src/app/_models/EmployeeModel';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ModalArchiveEmployeeComponent } from '../../modal/modal-archive-employee/modal-archive-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalEditEmployeeComponent } from '../../modal/modal-edit-employee/modal-edit-employee.component';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent implements AfterViewInit {

  faPencil = faPencil;
  faTrashCan = faTrashCan;

  displayedColumns: string[] = ['username', 'fullname', 'position', 'action'];
  dataSource: MatTableDataSource<EmployeeList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,  
              private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(staffList);
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


  openArchiveEmployee(id: number) {

    let username = staffList.find(x => x.id === id)?.username;

    this.dialog.open(ModalArchiveEmployeeComponent, {
      data: { employeeUsername: username }
    }).afterClosed().subscribe((res: boolean) => {
      console.log(res)
      if(res) {
        // api call here

        this.snackBar.open("Account was successfully deleted!", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: "danger-snackbar"
        });
      } else {
        
      }
    })
  }



  openEditEmployee(id: number) {
    
    let dummyCred = {
      id: 1,
      firstname: "carty king",
      middlename: "correa",
      lastname: "paglinawan",
      position: "Barangay Health Worker (BHW)",
      username: "paglica",
      password: "testpassword"
    }

    this.dialog.open(ModalEditEmployeeComponent, {
      data: { credentials: dummyCred },
      height: "fit-content",
      maxHeight: "calc(100vh - 10px)"
    }).afterClosed().subscribe((res: any) => {
      if(res) {
        // api call here

        this.snackBar.open("Successfully updated!", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: "success-snackbar"
        })
      }
    })

  }
}