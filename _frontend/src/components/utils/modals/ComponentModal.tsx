import { CloseHeader } from "components/layout/CustomHeader";
import React from "react";
import useModal from "state/useModal";

interface componentProp {
  component: React.Component;
  title: string;
}
export const ComponentModal = ({ component, title }: componentProp) => {
  const { isOpen } = useModal("component");
  return (
    <>
      {isOpen && (
        <div className="dimmed">
          <div className="modals">
            <div className="modals-content">
              <>
                <CloseHeader title={title} type={"close"} option={{name : "component"}} />
                {component}
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
