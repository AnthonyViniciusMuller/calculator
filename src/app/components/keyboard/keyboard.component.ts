import { Component, HostListener, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExpressionResultPipe } from '../../pipes/expression-result/expression-result.pipe';

@Component({
  selector: 'app-keyboard',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss'
})
export class KeyboardComponent {
  readonly expression = signal<string[]>([]);
  readonly finish = output<string[]>();

  nextExpression() {
    const hasValidResult = new ExpressionResultPipe().transform(this.expression())
    if (!hasValidResult) {
      return;
    }

    this.finish.emit(this.expression());
    this.expression.set([]);
  }

  addToExpression(simbol: string) {
    this.expression.update(simbols => [...simbols, simbol]);
  }

  clear() {
    this.expression.set([]);
  }

  undo() {
    this.expression.update(expression => [...expression.slice(0, -1)]);
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    const key = event.key;

    if (!isNaN(Number(key)) || ['+', '-', '*', '/', '%', '(', ')', '.'].includes(key)) {
      return this.addToExpression(key);
    } 
    
    if (key === 'Enter') {
      return this.nextExpression();
    } 
    
    if (key === 'Backspace') {
      this.undo();
    }
    
    if (key.toLowerCase() === 'c') {
      return this.clear();
    }
  }
}
