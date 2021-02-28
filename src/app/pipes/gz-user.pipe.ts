import { Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Pipe({ name: 'gzUser' })
export class GzUserPipe implements PipeTransform {
    // username: string;
    // subscription: Subscription;

    // constructor(private userService: UserService){
    //     this.subscription = this.userService.get_by_id()
    // }

    transform(dt: number): string {
        return `-`;
    }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    // }
}