import { Component, OnInit } from '@angular/core';
import { Story } from './models/story.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public notStarted: Story[];
  public inProgress: Story[];
  public completed: Story[];

  constructor(
  ) {}

  ngOnInit() {
    this.notStarted = [
      {
        description: 'Test description',
        taskList: [
          {
            description: 'this is a test task',
            completed: false
          }
        ]
      }
    ]
    this.inProgress = [];
    this.completed = [];
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    setTimeout( () => {
      console.log(this.notStarted)
      console.log(this.inProgress)
      console.log(this.completed)
    }, 0)
  }

  createStory() {
    this.notStarted.push({
      description: '',
      taskList: []
    })

    setTimeout(() => {
      (document.querySelector('.not-started .story-item:last-child input') as any).focus();
    }, 0)

  }

}
