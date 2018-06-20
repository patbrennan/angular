import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  // pure: false causes the pipe to update any time data changes (NOT performant!)
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    // recall that value is an array
    if (value.length === 0 || filterString === "") {
      return value;
    }
    
    const resultArray = [];
    
    for (const item of value) {
      
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
