import * as Yup from 'yup';

export const roomFormValidationSchema = Yup.object().shape({
  name: Yup.string().required('Tên tòa nhà không được để trống'),
  number_of_bedroom: Yup.number().required('Số phòng ngủ không được để trống'),
  number_of_bathroom: Yup.number().required('Số phòng tắm không được để trống'),
  reference_cost: Yup.object({
    deposit: Yup.number().optional().positive(),
    room_cost: Yup.number().optional().positive(),
    water_cost: Yup.number().optional().positive(),
    power_cost: Yup.number().optional().positive(),
    // cost_per_person: Yup.number().positive(),
    // cost_per_room: Yup.number().positive(),
  }),
});
