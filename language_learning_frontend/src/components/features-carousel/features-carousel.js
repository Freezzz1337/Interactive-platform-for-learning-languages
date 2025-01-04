import {Carousel, Image} from "react-bootstrap";
import "./features-carousel.css";

const FeaturesCarousel = () => {
    return (
        <section className="features">
            <Carousel slide>
                <Carousel.Item>
                    <Image
                        className="d-block w-100 carousel-img"
                        src={require('../../assets/img/carousel-img/first.png')}
                    />
                    <Carousel.Caption>
                        <div className="shadow-lg">
                            <h3>Create Your Own Flashcards</h3>
                            <p>Design and customize flashcards to suit your needs.</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <Image
                        className="d-block w-100 carousel-img"
                        src={require('../../assets/img/carousel-img/second.jpg')}
                    />
                    <Carousel.Caption>
                        <h3>Study Words from Ready-Made Sets</h3>
                        <p>Explore pre-made sets created by other users.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <Image
                        className="d-block w-100 carousel-img"
                        src={require('../../assets/img/carousel-img/third.jpg')}
                    />
                    <Carousel.Caption>
                        <h3>Take Tests</h3>
                        <p>Reinforce your knowledge with interactive quizzes.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <Image
                        className="d-block w-100 carousel-img"
                        src={require('../../assets/img/carousel-img/fourth.png')}
                    />
                    <Carousel.Caption>
                        <h3>Track Your Progress</h3>
                        <p>Monitor your achievements and growth.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </section>
    );
}
export default FeaturesCarousel;

