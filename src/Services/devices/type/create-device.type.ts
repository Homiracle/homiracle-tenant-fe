export type CreateDevice = {
    name: string,
    type: string,
    accessable_scope: string,
    accessable_scope_id: string,
    [key: string]: any,
};

export type CreateDeviceResponse = Partial<CreateDevice> & {
    device_id: string;
    status: string;
    path: string;
};