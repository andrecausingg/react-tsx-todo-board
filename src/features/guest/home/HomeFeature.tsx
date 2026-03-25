// Component
import HeaderComponent from "../../../component/header/HeaderComponent";
import BoardTableFeature from "./components/BoardTableFeature";

// Api
import { useAuthenticationApi } from "../../../api/authentication/authenticationApi";

// Content
import { useAuth } from "../../../context/authentication/AuthContext";

const HomeFeature: React.FC = () => {
  // Context
  const { status } = useAuth();

  // Api hooks
  const useAuthApiMutation = useAuthenticationApi();

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
          required: false,
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
        mutation: useAuthApiMutation,
      },
      modalConfig: {
        title: "Create",
      },
    },
  ];

  return (
    <>
      <div className="flex items-center justify-center md:h-screen">
        <div className="p-6 w-full ">
          <HeaderComponent
            title="Todo Board"
            actions={
              status == "authenticated"
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
