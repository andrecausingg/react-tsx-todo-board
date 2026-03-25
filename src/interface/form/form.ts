export type FieldConfig = {
  label: string;
  api_key: string;
  tag: string;
  required?: boolean;
  option?: string[]; // Add this if not already there
};

export type NetworkConfig = {
  api: string;
  method: string;
  mutation: any;
};

export type ModalConfig = {
  title: string;
  opened: boolean;
  onClose: () => void;
};

export type FormDataProps = {
  formConfig: FieldConfig[];
  networkConfig: NetworkConfig;
  modalConfig: ModalConfig;
};
