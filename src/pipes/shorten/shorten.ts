import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ShortenPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, len: number) {
    return value.substr(0, len);
  }
}

@Pipe({
  name: 'showrest',
})
export class ShowRestPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, len: number) {
    return value.substr(len, value.length - 1);
  }
}
