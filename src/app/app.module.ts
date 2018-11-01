import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoryCardComponent } from './story-card/story-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { MatInputModule, MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION, MatButtonModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    StoryCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [
 //   {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
