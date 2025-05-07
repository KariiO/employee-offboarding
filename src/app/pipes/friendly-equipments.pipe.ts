import { Pipe, PipeTransform } from '@angular/core';
import { Equipment } from '../models';

@Pipe({
  name: 'friendlyEquipments',
})
export class FriendlyEquipmentsPipe implements PipeTransform {
  transform(equipments: Equipment[]): string {
    return equipments.map(equipment => equipment.name).join(', ');
  }
}
