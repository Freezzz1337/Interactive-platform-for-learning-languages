import {useState} from "react";
import "./flashcard.css";
import {Button} from "react-bootstrap";
import {IoReload} from "react-icons/io5";
import {GrLinkNext, GrLinkPrevious} from "react-icons/gr";

const Flashcard = ({wordList}) => {
    let [indexCurrentWord, setIndexCurrentWord] = useState(0);

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

    const [flipped, setFlipped] = useState(false);
    return (
        <div className="text-center mt-5">
            {indexCurrentWord === wordList.length ? (
                <div className="flashcard-container d-flex  align-items-center justify-content-center">
                    <div className="front card p-4 d-flex align-items-center justify-content-center text-center">
                        <h2 className="mb-3">🎉 Congratulations! 🎉</h2>
                        <p className="fs-5">You have completed all flashcards.</p>

                        <Button
                            variant="primary"
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
                        <div className="front card p-3 d-flex align-items-center justify-content-center">
                            <h2>{wordList[indexCurrentWord].wordSource}</h2>
                        </div>
                        <div className="back card p-3 d-flex align-items-center justify-content-center">
                            <h2>{wordList[indexCurrentWord].wordTarget}</h2>
                        </div>
                    </div>
                </div>
            )}

            {indexCurrentWord === wordList.length ? null : (
                <div className="mt-3">
                    <Button className="me-5 btn-lg rounded-5" variant="outline-dark" disabled={indexCurrentWord === 0} style={{width:"70px"}} onClick={handlePrevButton}>
                        <GrLinkPrevious className="mb-1"/></Button>
                    <Button className="btn-lg rounded-5" variant="outline-dark" style={{width:"70px"}} onClick={handleNextButton}>
                        <GrLinkNext className="mb-1" /></Button>
                </div>
            )}

        </div>
    );
}
export default Flashcard;
