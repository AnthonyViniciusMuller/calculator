import { AfterViewInit, Component, effect, ElementRef, inject, linkedSignal, output } from '@angular/core';
import { ExpressionResultPipe } from '../../pipes/expression-result/expression-result.pipe';
import { ArrayToStringPipe } from '../../pipes/array-to-string/array-to-string.pipe';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-history',
  imports: [ExpressionResultPipe, ArrayToStringPipe, MatListModule, MatIconModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements AfterViewInit {
  readonly element = inject(ElementRef)

  readonly storageKey = "history";
  readonly history = linkedSignal(() => JSON.parse(localStorage.getItem(this.storageKey) || '[]') as string[][]);
  readonly chosePastExpression = output<string[]>();

  readonly saveToStorage = effect(() => {
    localStorage.setItem(this.storageKey, JSON.stringify(this.history()));
  });

  readonly scrollOnUpdate = effect(() => {
    this.history();
    setTimeout(() => this.scrollToBottom(), 0);
  });

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  add(expression: string[]) {
    this.history.update(history => [...history, expression]);
  }

  private scrollToBottom() {
    this.element.nativeElement.scrollTop = this.element.nativeElement.scrollHeight;
  }
}
