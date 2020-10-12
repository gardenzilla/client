export class DataTable<T> {
    constructor(
        public data: T[]
    ) { }
    private pageSize: number = 10;
    private currentPage: number = 1;
    setPageSize(to: number) {
        this.pageSize = to;
    }
    setData(data: T[]) {
        this.data = data;
    }
    next() { this.currentPage = this.getNextPage(); }
    getNextPage(): number { return this.currentPage < this.maxPageNumber() ? this.currentPage + 1 : this.currentPage; }
    back() { this.currentPage = this.getPreviousPage(); }
    getPreviousPage(): number { return this.currentPage > 1 ? this.currentPage - 1 : this.currentPage; }
    navigateTo(page: number) { if (page > 0 && page <= this.maxPageNumber()) { this.currentPage = page; } }
    getCurrentPage(): number { return this.currentPage; }
    maxPageNumber(): number {
        let calculatedValue = Math.ceil(this.data.length / this.pageSize);
        return calculatedValue == 0 ? 1 : calculatedValue;
    }
    pages(): number[] {
        let res = [];
        for (let i = 1; i <= this.maxPageNumber(); i++) {
            res.push(i);
        }
        return res;
    }
    display(): T[] {
        return this.data.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    }
}