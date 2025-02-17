import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'result'
})
export class ExpressionResultPipe implements PipeTransform {
  transform(expression: string[]): string | null {
    if (expression.length === 0) {
      return null;
    };
      
    try {
      return String(new Function(`return ${expression.join("")}`)());
    } catch (error) {
      return null;
    }
  }
}
