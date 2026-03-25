import type { NetworkConfig, FieldConfig } from "../form/form";

export type ModalConfig = {
  title: string;
};

export type ActionButton = {
  label: string;
  color: string;
  fieldConfig: FieldConfig[];
  networkConfig: NetworkConfig;
  modalConfig: ModalConfig;
};

export type HeaderProps = {
  title: string;
  actions: ActionButton[];
};
