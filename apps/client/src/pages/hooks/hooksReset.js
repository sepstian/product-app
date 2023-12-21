import React from "react";

const useToggleReset = () => {
    const [isOpenModalReset, setIsOpenModalReset] = React.useState(false);

    const onToggleOpenReset = () =>{
        setIsOpenModalReset(true)
    }
    const onToggleCloseReset = () =>{
        setIsOpenModalReset(false)
    };

    return {isOpenModalReset, onToggleOpenReset, onToggleCloseReset};
}

export default useToggleReset;