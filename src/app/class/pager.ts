import { Subject } from 'rxjs';

export class Pager<T> {
    constructor(
        public data: T[],
        public page_size: number = 10
    ) {
        // this.set_view();
    }
    /**
     * Store current page as state
     */
    current_page: number = 1;
    /**
     * View page items
     */
    private _display: T[] = [];
    set_data(data: T[]) {
        this.data = data;
        if (this.current_page > this.max_page_number()) { this.current_page = this.max_page_number(); }
        this.set_view();
    }
    /**
     * Step ahead
     */
    next() { this.current_page = this.next_page(); this.set_view(); }
    next_page(): number { return this.current_page < this.max_page_number() ? this.current_page + 1 : this.current_page; }
    /**
     * Step back
     */
    back() { this.current_page = this.previous_page(); this.set_view(); }
    previous_page(): number { return this.current_page > 1 ? this.current_page - 1 : this.current_page; };
    /**
     * Navigate to page directly
     */
    navigate_to(page: number) { if (page > 0 && page <= this.max_page_number()) { this.current_page = page; this.set_view(); } }
    /**
     * Determine the max page number
     * e.g.: 11 data length, 5 item / page
     * => Ceil(11/5) => 2.2 => 3
     */
    max_page_number(): number {
        let calculated_value = Math.ceil(this.data.length / this.page_size);
        return calculated_value == 0 ? 1 : calculated_value;
    }
    /**
     * Manual pagination
     */
    pagination(array: T[], page_size: number, page_number: number): T[] {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }
    /**
     * Get pages array
     */
    pages(): number[] {
        let res = [];
        for (let i = 1; i <= this.max_page_number(); i++) {
            res.push(i);
        }
        return res;
    }
    display(): T[] {
        this.set_view();
        return this._display;
    }
    /**
     * Send paginated data to the subscribers
     */
    private set_view() {
        this._display = this.pagination(this.data, this.page_size, this.current_page);
    }
}