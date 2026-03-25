// React
import { useEffect } from "react";

// Mantine
import {
  Modal,
  Button,
  TextInput,
  PasswordInput,
  Textarea,
  Select,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

// Interface
import type { FormDataProps, FieldConfig } from "../../interface/form/form";

// Content
import { useAuth } from "../../context/authentication/AuthContext";

const ModalFormComponent: React.FC<FormDataProps> = ({
  formConfig,
  networkConfig,
  modalConfig,
}) => {
  const { api, method, mutation } = networkConfig;
  const { opened, onClose, title } = modalConfig;

  // Context
  const { setAuthenticated } = useAuth();

  // Reset form and mutation open modal again
  useEffect(() => {
    if (opened) {
      form.reset();
      mutation?.reset();
    }
  }, [opened]);

  const initialValues = formConfig.reduce(
    (acc, field) => {
      acc[field.api_key] = "";
      return acc;
    },
    {} as Record<string, any>,
  );

  const validateRules = formConfig.reduce(
    (acc, field) => {
      if (field.required) {
        acc[field.api_key] = (value: string) =>
          value ? null : `${field.label} is required`;
      }
      return acc;
    },
    {} as Record<string, (value: any) => string | null>,
  );

  const form = useForm({
    initialValues,
    validate: validateRules,
  });

  // Handle submit
  const handleSubmit = async (values: Record<string, any>) => {
    const payload: Record<string, any> = {};

    Object.keys(values).forEach((key) => {
      if (values[key] !== "" && values[key] !== null) {
        payload[key] = values[key];
      }
    });

    mutation.mutate(
      {
        payload,
        api,
        method,
      },
      {
        onSuccess: (data: any) => {
          if (data?.message === "Successfully login.") {
            setAuthenticated();
          }

          notifications.show({
            title: data?.title_message || "Success",
            message: data?.message || "Success process.",
            color: "green",
          });

          form.reset();
          onClose();
        },

        onError: (error: any) => {
          notifications.show({
            title: error?.title_message || "Error",
            message: error?.message || "Something went wrong!",
            color: "red",
          });

          const formattedErrors = Object.keys(error?.errors || {}).reduce(
            (acc: Record<string, string>, field) => {
              const msgs = error.errors[field];
              acc[field] = Array.isArray(msgs) ? msgs.join(", ") : msgs;
              return acc;
            },
            {},
          );

          form.setErrors(formattedErrors);
        },
      },
    );
  };

  // Render fields
  const renderField = (field: FieldConfig) => {
    const props = {
      label: field.label,
      ...form.getInputProps(field.api_key),
      mb: "sm" as const,
    };

    switch (field.tag) {
      case "TextInput":
        return <TextInput key={field.api_key} {...props} />;
      case "PasswordInput":
        return <PasswordInput key={field.api_key} {...props} />;
      case "Textarea":
        return <Textarea key={field.api_key} {...props} />;
      case "DateInput":
        return <DateInput key={field.api_key} {...props} />;
      case "Select":
      case "Select":
        const selectData =
          field.option?.map((opt: string) => ({
            value: opt,
            label: opt.charAt(0).toUpperCase() + opt.slice(1).replace("_", " "),
          })) || [];

        return (
          <Select
            key={field.api_key}
            {...props}
            data={selectData} // Use the transformed objects here
            placeholder={`Select ${field.label}`}
            clearable
            searchable
          />
        );
      default:
        return null;
    }
  };

  // Handle onclose
  const handleOnCloseModal = () => {
    form.clearErrors();
    form.reset();
    mutation?.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleOnCloseModal}
      title={title}
      closeOnClickOutside={false}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {formConfig.map(renderField)}

        <Button type="submit" fullWidth mt="md" loading={mutation?.isPending}>
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default ModalFormComponent;
