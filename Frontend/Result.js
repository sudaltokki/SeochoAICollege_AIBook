import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import img_PreArrow from './assets/arrows/prev1.png';
import img_NextArrow from './assets/arrows/next1.png';


import TypingText from './TypingText';
import './Result.css';

// 화살표 커스텀
const PrevArrow = (props) => {
    const { img, onClick } = props;
    return (
      <div onClick={onClick} className="prevarrow">
        <img src={img_PreArrow} width="100px" height="100px" />
      </div>
    );
};
  
const NextArrow = (props) => {
    const { img, onClick } = props;
    return (
      <div onClick={onClick} className="nextarrow">
        <img src={img_NextArrow} width="100px" height="100px" />
      </div>
    );
};


const Result = ({ images, stories, title }) => {

    const navigate = useNavigate();

    // React-Slick 세팅
    const settings = {
        dots: true,
        infinite: false, // 무한루프
        speed: 500, // 슬라이드 속도
        slidesToShow: 1, // 한번에 보여지는 개수
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    // 이전, 다음 버튼 누를때마다 stories 타이핑 효과 적용
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleSlideChange = (index) => {
        setCurrentSlide((() => index));
    };

    useEffect(() => {
        const slider = document.querySelector(".slick-slider");
        slider.addEventListener("afterChange", handleSlideChange);

        return () => {
            slider.removeEventListener("afterChange", handleSlideChange);
        };
    }, []);

    return (
        <div className="result">
            <input type="button" onClick={() => { navigate('/Main'); }} className="img_button_main"/>
            <div className="result_title">
                <p>{title}</p>
            </div>
            <Slider {...settings} afterChange={handleSlideChange}>
                {
                    images.map((image, index) => (
                        <div key={index} className="slider_image">
                            <img src={image} /*alt={`Image ${index}`}*/ className="center_image" />
                            <br />
                            <TypingText text={stories[index]} interval={60} currentSlide={currentSlide} index={index} />
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}

export default Result;