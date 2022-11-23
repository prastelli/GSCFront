import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Person } from 'src/app/interface/Person.interface';
import { PersonService } from '../../service/person.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from 'src/app/service/token.service';
import { jwtObject } from '../../interface/jwtObject.interface';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})
export class ListPersonComponent implements OnInit , AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'phoneNumber', 'emailAddress','acciones'];
  dataSource = new MatTableDataSource<Person>();
  message!: string;
  jwtObject!: jwtObject;
  disabled!: boolean;
  loading: boolean = false;

 constructor(private PersonService:PersonService,private _snackBar: MatSnackBar, private TokenService:TokenService) { }

 @ViewChild(MatPaginator) paginator!: MatPaginator
 @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.PersonService.getAll().subscribe(data =>{
      this.dataSource.data = data
      this.loading = true
    }

    )
    this.jwtObject = this.TokenService.getDecoded()
  }

  ngAfterViewInit() {
    //console.log(this.dataSource.paginator?.length)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
    }
  }

  deletePerson(id: number) {
    if(this.jwtObject.rol == 'Admin'){
      this.PersonService.deletePerson(id).subscribe(() =>{
        this.message = 'Person Deleted'
        this.mensaje(this.message);
        this.PersonService.getAll();
      })

    } else{
      this.message = 'You do not have the permissions to perform this action'
      this.mensaje(this.message);
      }
    }

  mensaje(messageOp:string) {
    this._snackBar.open(messageOp,'', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }
}


