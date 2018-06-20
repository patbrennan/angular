import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shorten" // specify the name for the pipe for use in template
})
export class ShortenPipe implements PipeTransform {
  // must have this method to work - can take a list of optional arguments
  transform(value: any, limit: number = 10) {
    if (value.length > limit) {
      return value.substr(0, limit) + " ...";
    }
    
    return value;
  }
}