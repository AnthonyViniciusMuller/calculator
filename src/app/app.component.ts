import { Component } from '@angular/core';
import { HistoryComponent } from "./components/history/history.component";
import { PreviewComponent } from "./components/preview/preview.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { KeyboardComponent } from './components/keyboard/keyboard.component';

@Component({
  selector: 'app-root',
  imports: [KeyboardComponent, HistoryComponent, PreviewComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent { }
