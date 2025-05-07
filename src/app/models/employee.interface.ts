import { Status } from './status.enum';
import { Equipment } from './equipment.interface';

export interface Employee {
  id: string;
  name: string;
  department: string;
  status: Status;
  email: string;
  equipments: Equipment[];
}
