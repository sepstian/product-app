import React from "react";

const useToggleEdit = () => {
    const [isOpenModalEdit, setIsOpenModalEdit] = React.useState(false);

    const onToggleOpenEdit = () =>{
        setIsOpenModalEdit(true)
    }
    const onToggleCloseEdit = () =>{
        setIsOpenModalEdit(false)
    };

    return {isOpenModalEdit, onToggleOpenEdit, onToggleCloseEdit};
}

export default useToggleEdit;