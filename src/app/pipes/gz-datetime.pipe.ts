import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/

const monthNames = ["január", "február", "március", "április", "május", "június",
"július", "augusztus", "szeptember", "október", "november", "december"
];

@Pipe({name: 'gzDateTime'})
export class GzDateTimePipe implements PipeTransform {
    transform(dt: any): string {
        let date = new Date(dt);
        let d: string;
        switch(todayDistance(date)) {
            case 0: d = 'ma'; break;
            case -1: d = 'tegnap'; break;
            case -2: d = 'tegnapelőtt'; break;
            default: d = `${date.getFullYear()}. ${monthNames[date.getMonth()]} ${date.getDate()}.`;
        }
        return `${d}, ${date.getHours()}:${date.getMinutes()}`;
    }
}

const todayDistance = (someDate: Date): number => {
    const now: Date = new Date();
    return Math.round((now.getTime()-someDate.getTime())/(1000*60*60*24)) * -1;
}