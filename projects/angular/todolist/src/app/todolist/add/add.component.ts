/*
|--------------------------------------------------------------------------
| Form Component
|--------------------------------------------------------------------------
*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo/todo.model';


@Component({
  selector: 'app-form',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class FormComponent implements OnInit {

  newTask: Todo = new Todo();
  postForm: FormGroup;
  id: string = '';
  item = {}

  constructor(
    private service: TodoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private Activatedroute:ActivatedRoute) { }

  // On Init

  ngOnInit(): void {

    this.id = this.Activatedroute.snapshot.params['id'];

    if(this.id){
      this.getData(this.id); 
    }

    this.postForm = this.formBuilder.group({
        title: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        description: ['', Validators.required]
    });
    
  }

  // Save

  save(event) {
    event.preventDefault(); 

    if(this.id){
      this.service.update(this.postForm.value).then(() => {
        alert('Editado com sucesso')
        this.router.navigate(["/"]);
     })
    }else{
      this.service.insert(this.postForm.value).then(() => {
        alert('Adicionado com sucesso')
        this.router.navigate(["/"]);
     })
    }

  }

  // Get Data

  getData(id): any {
    this.service.find(id).then( (item: any) => { 
      (<HTMLInputElement>document.querySelector('.title')).value = item.title;
      (<HTMLInputElement>document.querySelector('.description')).value = item.description;

    }); 

  } 

}
