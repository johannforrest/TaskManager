import { Component, OnInit } from '@angular/core';
import { Story } from './models/story.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ID } from './lib/id.generator';

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
  ) { }

  ngOnInit() {
    this.notStarted = [
      {
        description: 'Test description',
        id: ID(),
        expanded: true,
        taskList: [
          {
            description: 'this is a test task',
            completed: false,
            id: ID()
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

      // if this is the 'completed' swim lane, collapse story
      if (event.container.element.nativeElement.classList.contains('completed')) {
        const story = event.container.data[0] as any;
        if (!story.taskList.find(a => !a.completed)) {
          story.expanded = false;
        }

      }

    }
    
    setTimeout(() => {
      console.log(this.notStarted)
      console.log(this.inProgress)
      console.log(this.completed)

      // Auto scroll to the card dropped
      const currentCard = event.container.element.nativeElement.children[event.currentIndex];
      currentCard.scrollIntoView({
        block: 'end',
        behavior: 'smooth'
      });

      //event.currentIndex.element.nativeElement.focus();
    }, 0)
  }

  createStory() {
    this.notStarted.push({
      description: '',
      taskList: [],
      id: ID(),
      expanded: true
    })

    setTimeout(() => {
      const selectedInput = <HTMLInputElement>document.querySelector('.not-started .story-item:last-child input');
      if (selectedInput && selectedInput.focus) {
        selectedInput.focus();
      }
    }, 0)

  }

  removeStory($event: Story) {
    this.notStarted = this.notStarted.filter(s => s.id !== $event.id);
    this.inProgress = this.inProgress.filter(s => s.id !== $event.id);
    this.completed = this.completed.filter(s => s.id !== $event.id);

  }

  completeStory($event: Story) {
    this.removeStory($event);

    $event.expanded = false;
    this.completed.push($event);
  }


}
