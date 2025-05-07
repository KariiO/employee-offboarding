import { FriendlyEquipmentsPipe } from './friendly-equipments.pipe';
import { Equipment } from '../models';

describe('FriendlyEquipmentsPipe', () => {
  it('create an instance', () => {
    const pipe = new FriendlyEquipmentsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should make list out of equipment names', () => {
    const pipe = new FriendlyEquipmentsPipe();
    const equipment: Equipment[] = [
      { name: 'equipment 1', id: '1' },
      { name: 'equipment 2', id: '2' },
    ];

    expect(pipe.transform(equipment)).toEqual('equipment 1, equipment 2');
  });
});
