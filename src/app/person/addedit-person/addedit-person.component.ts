import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute} from '@angular/router';
import { PersonService } from '../../service/person.service';
import { Person } from '../../interface/Person.interface';
import { TokenService } from 'src/app/service/token.service';
import { jwtObject } from '../../interface/jwtObject.interface';

@Component({
  selector: 'app-addedit-person',
  templateUrl: './addedit-person.component.html',
  styleUrls: ['./addedit-person.component.css']
})
export class AddeditPersonComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  operacion: string = 'Add';
  person!: Person;
  jwtObject!: jwtObject;

  constructor(private fb: FormBuilder,
    private PersonService: PersonService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute,
    private TokenService:TokenService) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],
    })
    this.id = Number(this.aRoute.snapshot.params['id'] || 0);
    this.jwtObject = this.TokenService.getDecoded()
  }



  ngOnInit(): void {

    if(this.id != 0) {
      this.operacion = 'Edit';
      this.getPerson(this.id)
    }
  }

  getPerson(id: number) {
    this.PersonService.getById(id).subscribe(data => {
      this.form.setValue({
        name: data.name,
        phoneNumber: data.phoneNumber,
        emailAddress: data.emailAddress,
      })
    })
  }

  addEditPerson() {
    if(this.jwtObject.rol == 'Admin'){
    // Armamos el objeto
    const person: Person = {
      name: this.form.value.name,
      phoneNumber: this.form.value.phoneNumber,
      emailAddress: this.form.value.emailAddress,
      id : this.id
    }

    if(this.id != 0) {
      this.editPerson(this.id, person);
    } else {
      this.addPerson(person);
    }
  } else{
    this.mensaje('You do not have the permissions to perform this action');
    }
  }

  editPerson(id: number, person: Person) {

     this.PersonService.updatePerson(id, person).subscribe(() => {
      this.mensaje('The person was successfully updated');
      this.router.navigate(['/person']);

    })
  }

  addPerson(person: Person) {

    this.PersonService.addPerson(person).subscribe(data => {
      const newPerson: Person = data
        this.mensaje('The person was successfully registered');
        this.router.navigate(['/person']);
      })
  }

  mensaje(texto: string) {
    this._snackBar.open(`${texto}`,'', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }

}
