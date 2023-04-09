
import { BaseRepository } from "../core/doc-mangement/base.user.repository";
import { CustomerEntity } from "./customer.entity";

export class userVerificationRepository extends BaseRepository<CustomerEntity> {
    protected getKey(customer: CustomerEntity): string {
        return `${customer.customerId}`;
    }

}
