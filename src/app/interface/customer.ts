export interface Customer {
    id: string,
    name: string,
    email: string,
    phone: string,
    tax_number: string,
    address: Address,
    date_created: string,
    created_by: string,
    has_user: boolean,
    users: string[]
}

export interface Address {
    zip: string,
    location: string,
    address: string
}

export interface CustomerNew {
    name: string,
    email: string,
    phone: string,
    tax_number: string,
    zip: string,
    location: string,
    address: string
}