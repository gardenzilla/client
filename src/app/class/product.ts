export class Product {
    constructor(
        public sku: string = "",
        public name: string = "",
        public quantity: string = "",
        public unit: string = "",
        public created_by: string = "",
        public date_created: string = ""
    ) {}
}

export class ProductNew {
    constructor(
        public name: string = "",
        public quantity: string = "",
        public unit: string = ""
    ) {}
}
