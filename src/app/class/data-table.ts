import { Subject } from 'rxjs';

export class DataTable<T> {
    constructor(
        public data: T[],
        private pageSize: number = 20,
        public display$: Subject<T[]> = new Subject(),
        public paginationObject$: Subject<PaginationObject> = new Subject()
    ) { }
    private currentPage: number = 1;
    setPageSize(to: number) {
        this.pageSize = to > 0 ? to : 1;
        this.currentPage = 1;
        this.render();
    }
    setData(data: T[]) {
        this.data = data;
        this.currentPage = 1;
        this.render();
    }
    goNext() { this.currentPage = this.getNextPage(); this.render(); }
    goBack() { this.currentPage = this.getPreviousPage(); this.render(); }
    navigateTo(page: number, size: number) {
        this.pageSize = size;
        if (page > 0 && page <= this.getPageCount()) {
            this.currentPage = page; this.render();
        }
    }
    private getNextPage(): number { return this.currentPage < this.getPageCount() ? this.currentPage + 1 : this.currentPage; }
    private getPreviousPage(): number { return this.currentPage > 1 ? this.currentPage - 1 : this.currentPage; }
    private getPageCount(): number {
        let calculatedValue = Math.ceil(this.data.length / this.pageSize);
        return calculatedValue == 0 ? 1 : calculatedValue;
    }
    private getDisplayData(): T[] {
        return this.data.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    }
    render() {
        this.display$.next(this.getDisplayData());
        this.paginationObject$.next(
            new PaginationObject(this.getPageCount(),
            this.currentPage,
            this.getPreviousPage(),
            this.getNextPage(),
            this.pageSize,
            this.data.length)
        );
    }
}

export class PaginationObject {
    constructor(
        public pageCount: number,
        public currentPage: number,
        public previousPage: number,
        public nextPage: number,
        public pageSize: number,
        public dataCount: number
    ) {}
}