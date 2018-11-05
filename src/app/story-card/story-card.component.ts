import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Story } from '../models/story.model';
import { Task } from '../models/task.model';
import { ID } from '../lib/id.generator';

export type StoryProgress = 'not-started' | 'in-progress' | 'complete';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss']
})
export class StoryCardComponent implements OnInit {
  @Input() story: Story;
  @Input() progress: StoryProgress;
  @Output() removeStory = new EventEmitter<Story>();
  @Output() completeStory = new EventEmitter<Story>();
  public pendingDelete: boolean = false;

  constructor() { }

  ngOnInit() {
    this.pendingDelete = false;
  }

  addTask($event) {
    this.story.taskList.push({
      description: '',
      completed: false,
      id: ID()
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
    if(parentCardEl) {
      const selectedInput = parentCardEl.querySelector('.task-item:last-child input')
      if(selectedInput && selectedInput.focus) {
          selectedInput.focus();
      }

    }

  }

  closeTask(task: Task) {
    this.story.taskList = this.story.taskList.filter(t => t.id !== task.id);
    
  }

  tryCloseStory() {
    if(this.incompleteTaskCount > 0) {
      this.pendingDelete = true;
    }
    else {
      this.closeStory();
    }
  }

  closeStory() {
    this.removeStory.emit(this.story);
  }
  cancelPendingDelete() {
    this.pendingDelete = false;
  }

  toggleExpand() {
    this.story.expanded = !this.story.expanded;
  }

  public get incompleteTasks(): Task[] {
    return this.story.taskList.filter(t => !t.completed);
  }

  public get incompleteTaskCount(): number {
    return this.incompleteTasks.length;
  }

  public complete() {
    this.completeStory.emit(this.story);
  }

  public get notStarted(): boolean {
    return this.progress === 'not-started';
  }

  public get inProgress(): boolean {
    return this.progress === 'in-progress';
  }

  public get completed(): boolean {
    return this.progress === 'complete';
  }

  // public get badgeValue(): string {
  //   if(this.story.taskList.length) {
      
  //   }
  //   if(this.incompleteTaskCount) {
  //     return this.incompleteTaskCount.toString() || '✔';

  //   }

  // } 

}
