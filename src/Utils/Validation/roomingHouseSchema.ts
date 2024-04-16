import * as Yup from 'yup';

export const roomingHouseFormValidationSchema = Yup.object().shape({
  name: Yup.string().required('Tên tòa nhà không được để trống'),
  opening_hour: Yup.string().required('Giờ mở cửa không được để trống'),
  closing_hour: Yup.string().required('Giờ đóng cửa không được để trống'),
  number_of_period_days: Yup.number().positive().required(''),
  closing_money_date: Yup.number()
    .positive()
    .required('Closing money date is required'),
  start_receiving_money_date: Yup.number().required(
    'Ngày bắt đầu đóng tiền không được để trống',
  ),
  end_receiving_money_date: Yup.number().required(
    'Ngày hết hạn đóng tiền không được để trống',
  ),
  address: Yup.object({
    province: Yup.string().required('Tỉnh/Thành phố không được để trống'),
    district: Yup.string().required('Quận/Huyện không được để trống'),
    commune: Yup.string().required('Phường/Xã không được để trống'),
    street: Yup.string().required('Địa chỉ không được để trống'),
  }),
  reference_cost: Yup.object({
    deposit: Yup.number().optional().positive().min(0),
    room_cost: Yup.number().optional().positive().min(0),
    water_cost: Yup.number().optional().positive().min(0),
    power_cost: Yup.number().optional().positive().min(0),
    // cost_per_person: Yup.number().positive(),
    // cost_per_room: Yup.number().positive(),
  }),
});
