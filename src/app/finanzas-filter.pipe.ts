import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mesFilter'
})
export class MesFilterPipe implements PipeTransform {
  transform(items: any[], selectedMonth: number): any[] {
    if (!items || !selectedMonth) {
      return items;
    }

    return items.filter(item => item.fecha === selectedMonth);

  }
}



