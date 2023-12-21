import React from "react";

const useToggleDelete = () => {
    const [isOpenModalDelete, setIsOpenModalDelete] = React.useState(false);

    const onToggleOpenDelete = () =>{
        setIsOpenModalDelete(true)
    }
    const onToggleCloseDelete = () =>{
        setIsOpenModalDelete(false)
    };

    return {isOpenModalDelete, onToggleOpenDelete, onToggleCloseDelete};
}

export default useToggleDelete;