import {useState} from "react";

const usePagination = (initialPage = 0, initialSize = 10, initialShowMoreButton = true) => {
    const [page, setPage] = useState(initialPage);
    const [size, setSize] = useState(initialSize);
    const [showMoreButton, setShowMoreButton] = useState(initialShowMoreButton);


    const handleNextPage = (e) => {
        e.preventDefault();
        setPage(prevState => prevState + 1);
    }

    return{
        page,
        size,
        setSize,
        showMoreButton,
        setShowMoreButton,
        handleNextPage
    }
};

export default usePagination;