import React, { useState } from "react";
import "./styles.css";

const ModalComponent = ({ children, modalOpen, setModalOpen }: any) => {
  return (
    <>
      {modalOpen ? (
        <div className="modalMainContainer">
          <div className="modalContainer">
            <div className="modalHeader">
              <button
                className="modalCloseBtn"
                onClick={() => setModalOpen(false)}
              >
                X
              </button>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalComponent;
