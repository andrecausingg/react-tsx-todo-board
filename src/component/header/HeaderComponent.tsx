// React
import { useState } from "react";

// Component
import ModalFormComponent from "../form/ModalFormComponent";

// Interface
import type { HeaderProps } from "../../interface/header/header";

const HeaderComponent: React.FC<HeaderProps> = ({ title, actions }) => {
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">{title}</h1>

        <div className="flex gap-x-1">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => setActiveModalIndex(index)}
              className={`px-4 py-2 text-xs text-white rounded-xl shadow-md active:scale-95 transition cursor-pointer ${action.color}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Render ModalForm dynamically */}
      {actions.map((action, index) => {
        const isOpen = activeModalIndex === index;

        return (
          <ModalFormComponent
            key={index}
            formConfig={action.fieldConfig}
            networkConfig={action.networkConfig}
            modalConfig={{
              title: action.modalConfig.title,
              description: action.modalConfig.description,
              opened: isOpen,
              onClose: () => setActiveModalIndex(null),
            }}
          />
        );
      })}
    </>
  );
};

export default HeaderComponent;
