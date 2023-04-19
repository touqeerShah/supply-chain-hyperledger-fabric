import { BaseEntity } from "../core/doc-mangement/base.entity";
// this stuct for what data field will store into blockchain


export class CustomerEntity extends BaseEntity {
    customerId: string;
    name: string;
    date: string;
    price: string;
    deliveryData: string;
    quantity: string;
    status: string

}


export class CustomerEntityCount {
    count: number;
}