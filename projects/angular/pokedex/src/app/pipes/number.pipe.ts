import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'PokeNumber'
})
export class PokeNumberPipe implements PipeTransform {

  transform(value: number): string {
    return ('000' + value).slice(-3);
  }

}
