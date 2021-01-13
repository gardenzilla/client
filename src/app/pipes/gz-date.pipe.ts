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

@Pipe({ name: 'gzDate' })
export class GzDatePipe implements PipeTransform {
    transform(dt: string): string {
        if (dt.length == 0) return 'Nan';
        let date = new Date(dt);
        switch (todayDistance(date)) {
            case 0: return 'ma';
            case -1: return 'tegnap';
            case -2: return 'tegnapelőtt';
            default: return `${date.getFullYear()}. ${monthNames[date.getMonth()]} ${date.getDate()}.`;
        }
    }
}

const todayDistance = (someDate: Date): number => {
    const today: Date = new Date();
    return Math.round((today.getTime() - someDate.getTime()) / (1000 * 60 * 60 * 24)) * -1;
}