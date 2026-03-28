// Component
import HeaderComponent from "../../../component/header/HeaderComponent";
import BoardTableFeature from "./components/BoardTableFeature";

// React
import { useEffect } from "react";

// Api | Auth
import { useAuthenticationApi } from "../../../api/authentication/authenticationApi";

// Api | Todo
import { useApi } from "../../../api/todo/todoApi";
// Api Fetch | Todo
import { useFetch } from "../../../api/todo/todoApi";

// Mantine
import { notifications } from "@mantine/notifications";

// Redux hooks
import { useAppDispatch } from "../../../redux/hooks";

// Redux | States and actions
import {
  // Action
  setBoardTasks,
} from "../../../redux/features/board/todoBoardDragAndDropSlice";

// Context
import { useAuth } from "../../../context/authentication/AuthContext";

const HomeFeature: React.FC = () => {
  // Redux
  const dispatch = useAppDispatch();

  // Context
  const { status } = useAuth();

  // Api hooks | Auth
  const useAuthApiMutation = useAuthenticationApi();

  // Api hooks | Todo
  const useTodoApiMutation = useApi();
  // Fetch hooks | Todo Fetch
  const todoUseFetch = useFetch({}, "/v1/todo", {
    enabled: status === import.meta.env.VITE_AUTHENTICATED,
  });

  const headerButtons = [
    {
      label: "Login",
      color: "bg-blue-500 hover:bg-blue-600",
      fieldConfig: [
        {
          label: "Email",
          api_key: "email",
          tag: "TextInput",
          required: true,
        },
        {
          label: "Password",
          api_key: "password",
          tag: "PasswordInput",
          required: true,
        },
      ],
      networkConfig: {
        api: "/v1/login",
        method: "POST",
        mutation: useAuthApiMutation,
      },
      modalConfig: {
        title: "Login",
      },
    },
    {
      label: "Signup",
      color: "bg-purple-500 hover:bg-purple-600",
      fieldConfig: [
        {
          label: "Email",
          api_key: "email",
          tag: "TextInput",
          required: true,
        },
        {
          label: "Password",
          api_key: "password",
          tag: "PasswordInput",
          required: true,
        },
        {
          label: "Password Confirmation",
          api_key: "password_confirmation",
          tag: "PasswordInput",
          required: true,
        },
      ],
      networkConfig: {
        api: "/v1/register",
        method: "POST",
        mutation: useAuthApiMutation,
      },
      modalConfig: {
        title: "Signup",
      },
    },
  ];

  const headerAuthenticatedButtons = [
    {
      label: "Create",
      color: "bg-blue-500 hover:bg-blue-600",
      fieldConfig: [
        {
          label: "Title",
          api_key: "title",
          tag: "TextInput",
          required: true,
        },
        {
          label: "Status",
          api_key: "status",
          tag: "Select",
          required: true,
          option: ["todo", "in_progress", "done"],
        },
        {
          label: "Expired at",
          api_key: "expired_at",
          tag: "DateInput",
          required: false,
        },
        {
          label: "Description",
          api_key: "description",
          tag: "Textarea",
          required: false,
        },
      ],
      networkConfig: {
        api: "/v1/todo",
        method: "POST",
        mutation: useTodoApiMutation,
        useFetch:
          status === import.meta.env.VITE_AUTHENTICATED
            ? todoUseFetch
            : undefined,
        isFetchEnable: true,
      },
      modalConfig: {
        title: "Create",
      },
    },
    {
      label: "Logout",
      color: "bg-red-500 hover:bg-red-600",
      fieldConfig: [],
      networkConfig: {
        api: "/v1/settings/logout",
        method: "GET",
        mutation: useAuthApiMutation,
        useFetch:undefined,
        isFetchEnable: true,
      },
      modalConfig: {
        title: "Logout",
        description: "Are you sure you want to logout?"
      },
    },
  ];

  // Fetch todo
  useEffect(() => {
    if (status === import.meta.env.VITE_AUTHENTICATED && todoUseFetch?.data) {
      dispatch(setBoardTasks(todoUseFetch.data.data || []));

      notifications.show({
        title: todoUseFetch?.data?.title_message || "Success",
        message: todoUseFetch?.data?.message || "Success fetch.",
        color: "green",
      });
    }
  }, [status, todoUseFetch?.data]);

  return (
    <>
      <div className="flex items-center justify-center md:h-screen mt-8 md:mt-0">
        <div className=" w-full ">
          <HeaderComponent
            title="Todo Board"
            actions={
              status == import.meta.env.VITE_AUTHENTICATED
                ? headerAuthenticatedButtons
                : headerButtons
            }
          />
          <BoardTableFeature />
        </div>
      </div>
    </>
  );
};

export default HomeFeature;
