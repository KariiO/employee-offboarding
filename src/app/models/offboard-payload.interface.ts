import {Address} from './address.interface';

export interface OffboardPayload {
  address: Address;
  notes: string;
  phone: string;
  email: string;
}
