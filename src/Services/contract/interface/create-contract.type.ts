export type Contract = {
    house_id: number;
    floor_id: number;
    room_id: number;
    start_date: string;
    end_date: string;
    couting_fee_day:string;
    paying_cost_cycle: number;
    maximmum_number_of_people: number;
    reference_cost: {
        deposit?: number;
        room_cost?: number;
        water_cost?: number;
        power_cost?: number;
        cost_per_person?: number;
        cost_per_room?: number;
      };
      [key: string]: any;
      tenant_id?: string;

};