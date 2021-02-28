import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'gzNumber' })
export class GzNumberPipe implements PipeTransform {
    transform(dt: number): string {
        return dt.toLocaleString();
    }
}