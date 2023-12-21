import React from "react";

const useToggleSort = () => {
    const [isOpenModalSort, setIsOpenModalSort] = React.useState(false);

    const onToggleOpenSort = () =>{
        setIsOpenModalSort(true)
    }
    const onToggleCloseSort = () =>{
        setIsOpenModalSort(false)
    };

    return {isOpenModalSort, onToggleOpenSort, onToggleCloseSort};
}

export default useToggleSort;