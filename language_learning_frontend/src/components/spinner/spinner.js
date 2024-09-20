import "./spinner.css";

const Spinner = ({
                     size = '2.8rem',
                     color = '#183153',
                     speed = '1s',
                     isLoading = true,
                     positionAbsolute = false,
                     overlay = false
                 }) => {
    const spinnerStyle = {
        '--uib-size': size,
        '--uib-speed': speed,
        '--uib-color': color
    };

    if (!isLoading) {
        return null;
    }

    return (
        <div className={`${overlay ? 'spinner-overlay' : ''}
        ${positionAbsolute ? 'position-absolute' : ''}`}>
            <div className="dot-spinner"
                 style={spinnerStyle}>
                {[...Array(8)].map((_, index) => (
                    <div className="dot-spinner__dot" key={index}></div>
                ))}
            </div>
        </div>
    );
};
export default Spinner;