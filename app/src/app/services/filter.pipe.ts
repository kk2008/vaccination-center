import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter_bookings',
    pure: false
})
export class bookingFilterPipe implements PipeTransform {
    transform(items: any[], filter, result): any {
        if (!items || !filter) return items;

        // search center first
        items = items.filter(item => {
            if (filter["vaccine_center_id"] > 0) {
                if (Number(item["vaccine_center_id"]) == Number(filter["vaccine_center_id"])) return item;
            }         
            else return item;
        });
        // then only search keyword
        items = items.filter(item => {
            if (filter["search"]) {
                if (item["nric"]) {
                    if (item["nric"].toLowerCase().includes((filter["search"]).toLowerCase())) return item;
                }
                if (item["name"]) {
                    if (item["name"].toLowerCase().includes((filter["search"]).toLowerCase())) return item;
                }
                if (item["slot"]) {
                    if (item["slot"].toLowerCase().includes((filter["search"]).toLowerCase())) return item;
                }
            }    
            else return item;
        });
        if(result) result.data = items;
        return items;
    }
}