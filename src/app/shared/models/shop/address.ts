import { Province } from './province';
import { City } from './city';

export class Address {
    public addressId?: number;
        public firstName?: string;
        public lastName?: string;
        public barangay?: string;
        public street?: string;
        public province?: Province;
        public city?: City;
}