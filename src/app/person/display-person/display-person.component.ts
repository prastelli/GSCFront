import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../../service/person.service';
import { Person } from '../../interface/Person.interface';

@Component({
  selector: 'app-display-person',
  templateUrl: './display-person.component.html',
  styleUrls: ['./display-person.component.css']
})
export class DisplayPersonComponent implements OnInit {

  id: number;
  person!: Person;

constructor(private PersonService: PersonService,
    private aRoute: ActivatedRoute) {
    this.id = Number(this.aRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.getPerson();
  }

  ngOnDestroy(): void {

  }

  getPerson() {
      this.PersonService.getById(this.id).subscribe(data => {
      this.person = data;
    })
  }
}
