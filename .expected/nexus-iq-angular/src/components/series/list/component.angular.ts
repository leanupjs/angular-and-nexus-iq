import { Component } from '@angular/core';

import { ListSerieController } from './controller';

@Component({
  selector: 'list-serie',
  template: `
    <div>
      <h2>List</h2>
      <div>
        <button class="primary" id="add" type="button" (click)="add()">Add</button>
        <button class="secondary" id="start" type="button" *ngIf="showPerformanceButton" (click)="onStart()">
          Performance
        </button>
      </div>
      <table class="table" *ngFor="let element of elements; index as i">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Unit</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let serie of measuredSeries; index as i">
            <td>{{ i + 1 }}</td>
            <td>{{ serie.getId() }}</td>
            <td>{{ serie.getTitle() }}</td>
            <td>{{ serie.getUnit() }}</td>
            <td>
              <button id="edit-{{ i }}" type="button" (click)="edit(serie)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <small>Duration: {{ duration }} ms</small>
    </div>
  `,
})
export class ListSerieComponent extends ListSerieController {}
