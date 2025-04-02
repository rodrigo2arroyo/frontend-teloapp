import {Dialog} from "primereact/dialog";
import React from "react";

type ModalProps = {
    visible: boolean;
    onHide: () => void;
    closable?: boolean;
    dismissable?: boolean;
    focusOnShow?: boolean;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    headless?: boolean;
    children: React.ReactNode;
};

const Modal = ({
                   visible,
                   onHide,
                   closable = true,
                   dismissable = true,
                   focusOnShow = true,
                   header,
                   footer,
                   headless = false,
                   children,
               }: ModalProps) => {
    return (
        <Dialog
            className="w-[500px]"
            visible={visible}
            onHide={onHide}
            closable={closable}
            dismissableMask={dismissable}
            closeOnEscape={dismissable}
            draggable={false}
            resizable={false}
            focusOnShow={focusOnShow}
            header={ headless ?  undefined : (<div className="p-0">{header}</div>)  }
            footer={headless ? undefined : footer}
        >
            {children}
        </Dialog>
    );
};

export default Modal;
