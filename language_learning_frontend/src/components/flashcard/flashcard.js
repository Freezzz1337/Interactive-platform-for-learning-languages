import {useEffect, useState} from "react";
import "./flashcard.css";
import {Button} from "react-bootstrap";
import {IoReload} from "react-icons/io5";
import {GrLinkNext, GrLinkPrevious} from "react-icons/gr";
import {HiDotsHorizontal} from "react-icons/hi";
import WindowMenu from "../window-components/window-menu";

const Flashcard = ({wordList}) => {
    let [indexCurrentWord, setIndexCurrentWord] = useState(0);
    const [show, setShow] = useState(false);
    const [currentWordList, setCurrentWordList] = useState(wordList);

    const [options, setOptions] = useState({
        shuffleWords: false,
        swapSides: false
    });

    useEffect(() => {
        if (options.shuffleWords) {
            let currentIndex = wordList.length;

            while (currentIndex !== 0) {

                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                [currentWordList[currentIndex], currentWordList[randomIndex]] =
                    [currentWordList[randomIndex], currentWordList[currentIndex]];
            }
        } else {
            setCurrentWordList(wordList)
        }
    }, [options.shuffleWords])

    const handlePrevButton = (e) => {
        e.preventDefault();
        setIndexCurrentWord(prevState => prevState - 1);
    }

    const handleNextButton = (e) => {
        e.preventDefault();
        setIndexCurrentWord(prevState => prevState + 1);
    }

    const handleRestart = (e) => {
        e.preventDefault();
        setIndexCurrentWord(0);
    }

    const handleWindowClose = () => {
        setShow(false);
    }
    const handleWindowShow = () => {
        setShow(true);
    }

    const handleOptions = (e) => {
        const id = e.target.id;
        setOptions(prevState => ({...prevState, [id]: e.target.checked}));
    }

    const [flipped, setFlipped] = useState(false);

    return (
        <div className="text-center mt-5">
            {indexCurrentWord === wordList.length ? (
                <div  className="flashcard-container d-flex align-items-center justify-content-center">
                    <div
                        className="front card p-4 d-flex align-items-center justify-content-center text-center">
                        <h2 className="mb-3">🎉 Congratulations! 🎉</h2>
                        <p className="fs-5">You have completed all flashcards.</p>

                        <Button
                            variant="warning"
                            className="mt-3 d-flex align-items-center"
                            onClick={handleRestart}
                        >
                            <IoReload className="me-2" size={24}/>
                            Practice Again
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
                    <div className={`flashcard ${flipped ? "flipped" : ""}`}>
                        <div  className="front card p-3 d-flex align-items-center justify-content-center">
                            <h2>{options.swapSides ? currentWordList[indexCurrentWord].wordTarget : currentWordList[indexCurrentWord].wordSource}</h2>
                        </div>
                        <div className="back card p-3 d-flex align-items-center justify-content-center">
                            <h2>{options.swapSides ? currentWordList[indexCurrentWord].wordSource : currentWordList[indexCurrentWord].wordTarget}</h2>
                        </div>
                    </div>
                </div>
            )}

            {indexCurrentWord === wordList.length ? null : (
                <div     className="buttons-flashcard-container mt-3 mb-3">
                    <div className="buttons-flashcard-wrapper ">
                        <div className="buttons-center">
                            <Button className="me-5 btn-lg rounded-5" variant="outline-dark"
                                    disabled={indexCurrentWord === 0} style={{width: "70px"}}
                                    onClick={handlePrevButton}>
                                <GrLinkPrevious className="mb-1"/></Button>
                            <Button className="btn-lg rounded-5" variant="outline-dark" style={{width: "70px"}}
                                    onClick={handleNextButton}>
                                <GrLinkNext className="mb-1"/></Button>
                        </div>
                        <Button className="btn-lg rounded-5 buttons-end"
                                variant="outline-dark"
                                style={{width: "70px"}}
                                onClick={handleWindowShow}
                        >
                            <HiDotsHorizontal/></Button>
                    </div>
                </div>
            )}

            <WindowMenu show={show} handleClose={handleWindowClose} options={options} handleOptions={handleOptions}/>
        </div>
    );
}
export default Flashcard;
