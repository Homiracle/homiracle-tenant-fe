interface Address {
  province: string;
  district: string;
  commune: string;
  street: string;
}

interface Landlord {
  user_id: string;
  user_name: string;
  email: string;
  phone: string;
}

interface Tenant {
  user_id: string;
  user_name: string;
  email: string;
  phone: string;
}

interface Room {
  room_id: string;
  name: string;
  rooming_house: {
      rooming_house_id: string;
      name: string;
      address: Address;
  };
}

interface Cost {
  room_cost: number;
  water_cost: number;
  power_cost: number;
  deposit: number;
}

interface Contract {
  cost: Cost;
  landlord: Landlord;
  tenant: Tenant;
  room: Room;
  start_date: string;
  end_date: string;
  couting_fee_day: string;
  paying_cost_cycle: number;
  maximum_number_of_peoples: number;
  contract_id: string;
}

export interface Attendance {
  attendance_id: number;
  status: string;
  attendance_date: string;
  contract: Contract;
}

export interface AttendanceData {
  attendance: Attendance;
  num_of_attendances: number;
  num_of_iot_devices: number;
}

export interface AttendanceDetailResponse {
  attendance_id: number;
  landlord: {
    user_name: string;
    email: string;
  };
  tenant: {
    user_name: string;
    email: string;
  };
  name: string;
  address: string;
  cost: Cost;
  start_date: string;
  end_date: string;
  couting_fee_day: string;
  paying_cost_cycle: number;
  maximum_number_of_peoples: number;
}