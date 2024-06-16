import book1 from "../../img/7773488.png";
import book2 from "../../img/7945315.png";
import book3 from "../../img/2208.i305.021.S.m005.c13.realistic book lovers day.jpg";
import './Carousel.css'

function Carousel (){
    return (
        <div
                id="carouselExampleIndicators"
                class="carousel slide"
                data-bs-ride="/home/hemkant/Desktop/Project/Java Project/Frontend/ebook/src/pages/Home.jsx/home/hemkant/Desktop/Project/Java Project/Frontend/ebook/src/pages/Home.jsxsel"
            >
                <div class="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        class="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={book2} class="img-fluid carousel-img" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src={book3} class="img-fluid carousel-img" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src={book1} class="img-fluid carousel-img" alt="..." />
                    </div>
                </div>
                <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                >
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                >
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
    )
}


export default Carousel