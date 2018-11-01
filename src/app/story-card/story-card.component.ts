import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Story } from '../models/story.model';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss']
})
export class StoryCardComponent implements OnInit {
  @Input() story: Story;

  constructor() { }

  ngOnInit() {
  }

  addTask($event) {
    this.story.taskList.push({
      description: '',
      completed: false
    });

    setTimeout(() => {
      // auto select the newly created input
      this.focusLastTaskInput($event)
    }, 0)

  }

  private focusLastTaskInput($event): void {
    // find the parent with the story card class
    const parentCardEl = $event.path.find(el =>
      el.className.split(' ')
        .find(cn => cn === 'story-card')
    )

    parentCardEl.querySelector('.task-item:last-child input').focus()
  }

}
