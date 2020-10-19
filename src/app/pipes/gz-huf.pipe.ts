import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'gzHuf'})
export class GzHufPipe implements PipeTransform {
    transform(dt: number): string {
        return `${dt.toLocaleString()} HUF`;
    }
}