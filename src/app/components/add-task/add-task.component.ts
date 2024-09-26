import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { Tarefa } from '../../models/Tarefa';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() onAddTask = new EventEmitter<Tarefa>();

  taskForm: FormGroup;
  mostrarAddTarefa: boolean = false;

  constructor() {
    this.taskForm = new FormGroup({
      tarefa: new FormControl('', Validators.required),
      categoria: new FormControl(''),
      concluido: new FormControl(false)
    });
  }

  alteraVisualizacao(valor: boolean){
    this.mostrarAddTarefa = valor;
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      alert('Adicione uma tarefa!');
      return;
    }

    const novaTarefa: Tarefa = {
      tarefa: this.taskForm.value.tarefa,
      categoria: this.taskForm.value.categoria,
      concluido: this.taskForm.value.concluido
    };

    this.onAddTask.emit(novaTarefa);

    this.taskForm.reset();
  }
}
