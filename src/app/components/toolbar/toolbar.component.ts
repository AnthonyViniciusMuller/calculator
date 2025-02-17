import { Component, effect, input, OnInit, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  readonly undo = output();

  readonly storageKey = "isDarkMode"
  readonly isDarkMode = signal<boolean>(JSON.parse(localStorage.getItem(this.storageKey) || "false"));

  ngOnInit() {
    if (!this.isDarkMode()) {
      return;
    }

    this.toggleDarkMode();    
  }

  toggleDarkMode() {
    this.isDarkMode.set(document.body.classList.toggle('dark-mode'));
  }

  readonly saveThemePreferenceToStorage = effect(() => {
    localStorage.setItem(this.storageKey, JSON.stringify(this.isDarkMode()));
  });
}
