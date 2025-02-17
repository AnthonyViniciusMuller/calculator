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
      const result = new Function(`return ${expression.join("")}`)();

      return result ? String(result) : null;
    } catch (error) {
      return null;
    }
  }
}
