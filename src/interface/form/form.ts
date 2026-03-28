export type FieldConfig = {
  label: string;
  api_key: string;
  tag: string;
  required?: boolean;
  option?: string[];
};

export type NetworkConfig = {
  api: string;
  method: string;
  mutation: any;
  useFetch?: any;
  isFetchEnable?: boolean;
};

export type ModalConfig = {
  title: string;
  opened: boolean;
  onClose: () => void;
  description?: string;
};

export type FormDataProps = {
  formConfig: FieldConfig[];
  networkConfig: NetworkConfig;
  modalConfig: ModalConfig;
};
