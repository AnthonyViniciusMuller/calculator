import { Component, input } from '@angular/core';
import { ExpressionResultPipe } from '../../pipes/expression-result/expression-result.pipe';
import { ArrayToStringPipe } from '../../pipes/array-to-string/array-to-string.pipe';

@Component({
  selector: 'app-preview',
  imports: [ExpressionResultPipe, ArrayToStringPipe],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent {
  readonly expression = input.required<string[]>();
}
