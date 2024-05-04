interface Address {
  province: string;
  district: string;
  commune: string;
  street: string;
}

interface Landlord {
  user_id: string;
  user_name: string;
}

interface Tenant {
  user_id: string;
  user_name: string;
}

interface Room {
  name: string;
  rooming_house: {
      name: string;
      address: Address;
  };
}

interface Cost {
  room_cost: number;
}

interface Contract {
  cost: Cost;
  landlord: Landlord;
  tenant: Tenant;
  room: Room;
}

interface Attendance {
  attendance_id: number;
  status: string;
  contract: Contract;
}

export interface AttendanceData {
  attendance: Attendance;
  num_of_attendances: number;
  num_of_iot_devices: number;
}
