import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskService } from '../../services/task.service';
import { Tarefa } from '../../models/Tarefa';
import { TaskItemComponent } from "../task-item/task-item.component";
import { AddTaskComponent } from "../add-task/add-task.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  tarefas: Tarefa[] = [];

  constructor(private taskService: TaskService){}

  ngOnInit(): void {

    this.taskService.getTasks().subscribe( {
      next: (data) => {
        this.tarefas = data; // Quando a API retorna os dados, eles são armazenados no array tarefas
        console.log(data)
      },
      error: (err) => {
        console.error('Erro ao buscar tarefas', err); // Caso ocorra algum erro na requisição
      }
    });
    
  }

  deleteTask(tarefa: Tarefa) {
    this.taskService.deleteTask(tarefa).subscribe({
      next: () => {
        // Se a deleção for bem-sucedida, removemos a tarefa da lista
        this.tarefas = this.tarefas.filter((t) => t.id !== tarefa.id);
        alert('Tarefa deletada com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao deletar a tarefa:', err);
        alert('Ocorreu um erro ao tentar deletar a tarefa. Tente novamente.');
      }
    });
  }

  toggleConcluido(tarefa: Tarefa){
    tarefa.concluido = !tarefa.concluido;
    this.taskService.updateTask(tarefa).subscribe({});
  }

  addTask(tarefa: Tarefa){
    this.taskService.addTask(tarefa).subscribe({
      next: (tarefa) => {
        this.tarefas.push(tarefa);
        alert('Tarefa adicionada com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao deletar a tarefa:', err);
        alert('Ocorreu um erro ao tentar adicionar a tarefa. Tente novamente.');
      }
    });
  }

}
