import {Button} from "react-bootstrap";
import {IoReloadOutline} from "react-icons/io5";
import "./button-show-more.css";

const ButtonShowMore = ({showButton, handleNextPage, iconSize = "50px"}) => {
    return (
        <div className="button-show-more d-flex justify-content-center mt-3 mb-3">
            <Button hidden={showButton}
                    variant="outline-warning"
                    onClick={handleNextPage}>
                <IoReloadOutline size={iconSize}/>&nbsp;&nbsp;Show more
            </Button>
        </div>
    );
}
export default ButtonShowMore;