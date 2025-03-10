import "./button-anim.css";

const ButtonAnim = ({
                        buttonText = "Button Text",
                        type = "submit",
                        width = "auto",
                        height = "auto",
                        disabled = false,
                        className = ""
                    }) => {
    return (
        <button
            className={`button-anim ${className}`}
            type={type}
            style={{ width, height }}
            disabled={disabled}
        >
            {buttonText}
        </button>
    );
};
export default ButtonAnim;