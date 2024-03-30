import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, Component } from "react";

import './Keyword.css';

const Keyword = () => {
    const navigate = useNavigate();
    const [selectedKeyword, setSelectedKeyword] = useState('');

    const keywordClick = (selectedKeyword) => {
        alert(`"${selectedKeyword}"을(를) 선택하셨습니다.`);
        setSelectedKeyword(selectedKeyword)
        // navigate(`/Audio/${selectedKeyword}`);
        navigate(`/AudioServer/${selectedKeyword}`);
      }

    return (
        <div>
            <div className="keyword">
                <div className="button-container">
                    <div className="button-collection1">
                        <input type="button" onClick={() => keywordClick('남자아이')} className="img_button_boy"/>
                        <input type="button" onClick={() => keywordClick('고양이 키키')} className="img_button_cat"/>
                        <input type="button" onClick={() => keywordClick('슈퍼맨')} className="img_button_superman"/>
                    </div>
                    <div className="button-collection2">
                        <input type="button" onClick={() => keywordClick('여자아이')} className="img_button_girl"/>
                        <input type="button" onClick={() => keywordClick('개구리 핀')} className="img_button_frog"/>
                        <input type="button" onClick={() => keywordClick('공주 메리다')} className="img_button_princess"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Keyword;