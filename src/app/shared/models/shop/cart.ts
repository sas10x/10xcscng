import { Product } from './product';
import { Order } from './order';

export class Cart {
    public cartId?: number;
    public quantity?: number;
    public price?: number;
    public total?: number;
    public product?: number;
    public order?: number;
    public productName?: string;
}