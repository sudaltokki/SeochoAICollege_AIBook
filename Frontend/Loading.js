import React, { useState, useEffect } from "react";

import Spinner from './assets/Spinner.gif';
import BoyImage from './assets/tag/char_boy.png';
import GirlImage from './assets/tag/char_girl.png';
import CatImage from './assets/tag/char_cat.png';
import FrogImage from './assets/tag/char_frog.png';
import PrincessImage from './assets/tag/char_princess.png';
import SupermanImage from './assets/tag/char_superman.png';

import LoadingVideo from "./LoadingVideo.js";
import './Loading.css';

const Loading = (props) => {
    const text = props.text;
    const keyword = props.keyword;
    const textloading = props.textloading;

    const [imgkeyword, setImgkeyword] = useState(null);
    

    useEffect (() => {
        if (keyword === "남자아이") {
            setImgkeyword(BoyImage)
        } else if (keyword === "여자아이") {
            setImgkeyword(GirlImage)
        } else if (keyword === "고양이 키키") {
            setImgkeyword(CatImage)
        } else if (keyword === "개구리 핀") {
            setImgkeyword(FrogImage)
        } else if (keyword === "공주 메리다") {
            setImgkeyword(PrincessImage)
        } else if (keyword === "슈퍼맨") {
            setImgkeyword(SupermanImage)
        } else {
            setImgkeyword(null);
        }
    }, [keyword]);

    return (
        <div className="loading">
            <div className="loading_text">
                <p>🔨</p><p>동</p><p>화</p>&nbsp;<p>제</p><p>작</p><p>중</p>&nbsp;<p>뚝</p><p>딱</p><p>뚝</p><p>딱</p><p>🔨</p>
            </div>
            <div className="loading_title">
                {textloading ? (
                    <img src={Spinner} alt="로딩중" width="50px" />
                ) : (
                    <div className="loading_title">
                    {imgkeyword ? (
                        <img src={imgkeyword} width="140px" height="50px" />
                    ) : (
                        <p>자유주제</p>
                    )}
                    {/* <p>{keyword}</p> */}
                    <p>와(과) <span>"{text}"</span>를 조합해서 멋진 동화를 보여줄게!</p>
                    </div>
                )}
            </div>
            <div className="loading_video">
                <video controls width="600px" height="400px" autoPlay loop>
                    <source src="https://seocho-voicetest.s3.ap-northeast-2.amazonaws.com/%EC%95%84%EA%B8%B0%EC%83%81%EC%96%B4(%EC%98%81%EC%83%81).mp4" type="video/mp4" />
                </video>
                {/* <LoadingVideo /> */}
            </div>
        </div>
    );
};

export default Loading;