import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyText',
  standalone: true
})
export class EmptyTextPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (value === undefined || value === null || value === '') {
      return "No Information"
    }
    return value;
  }

}
