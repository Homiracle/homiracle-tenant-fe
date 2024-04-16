import * as Yup from 'yup';

export const floorFormValidationSchema = Yup.object().shape({
  name: Yup.string().required('Tên tòa nhà không được để trống'),
  reference_cost: Yup.object({
    deposit: Yup.number().optional().positive(),
    room_cost: Yup.number().optional().positive(),
    water_cost: Yup.number().optional().positive(),
    power_cost: Yup.number().optional().positive(),
    // cost_per_person: Yup.number().positive(),
    // cost_per_room: Yup.number().positive(),
  }),
});
