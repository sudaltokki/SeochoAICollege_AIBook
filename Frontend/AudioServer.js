import React, { useState } from "react";
import { useParams } from "react-router-dom";

import AudioRecord from "./AudioRecord.js";
import Loading from "./Loading.js";
import Result from "./Result.js";

import './AudioServer.css';

const AudioServer = () => {
  const { keyword } = useParams(); // Keyword.js에서 받아온 keyword

  const [visible, setVisible] = useState(true); // 녹음 | 로딩
  const [isLoading, setIsLoading] = useState(false); // 로딩 | 결과
  const [textloading, setTextLoading] = useState(false); // text가 로딩중일때

  const [myBucket, setMyBucket] = useState(null);
  const [text, setText] = useState("");

  const [images, setImages] = useState([]);
  const [stories, setStories] = useState([]);
  const [title, setTitle] = useState("");

  const handleAudioUrl = (url) => {
    setIsLoading(true);
    setVisible(false);
    setTextLoading(true);

     /* // presigned url을 사용안했을 때, */
    fetch("/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          keyword: keyword,
          file_url: url,
        }),
      })
      .then((res) => res.text())
      .then((data) => {
        // POST 요청이 성공하면 서버에서 반환한 데이터를 처리
        console.log("POST 요청 결과:", data);
        // ===========================================
        
        setTimeout(() => {
          setTextLoading(false);
        }, 5000); // 5초

        setTextLoading(false);
        
        setText(data); // 사용자가 녹음한 음성 설정

        // -----------------------2번째 API 통신----------------------
        fetch("/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            keyword: keyword,
            file_url: url,
          }),
        })
        .then((res) => res.json())
        .then((data) => {
          // POST 요청이 성공하면 서버에서 반환한 데이터를 처리
          console.log("POST 요청 결과:", data);
  
          const imageStoryPairs = data.image_story_pairs; // 이미지와 스토리를 포함한 배열
          
          // 이미지와 스토리를 따로 추출하여 배열에 저장
          const images = imageStoryPairs.map(pair => pair.image);
          const stories = imageStoryPairs.map(pair => pair.story);
          
          setTimeout(() => {
            setIsLoading(false);
          }, 20000); // 20초
  
          // setIsLoading(false); // 동화 로딩중

          setImages(images); // 이미지 여러 장 설정
          setStories(stories); // 스토리 데이터 설정
          setTitle(data.title);
        })
        .catch((error) => {
          console.error("POST 요청 오류: ", error);
        });

      })
      .catch((error) => {
        console.error("POST 요청 오류: ", error);
      });

  }
    
  return (
    <div className="full_screen" >
        {visible ? (
          <div className="audio">
            <AudioRecord onAudioUrl={handleAudioUrl}/>
          </div>
        ) : (
          <div>
            {isLoading ? (
              <div className="loading_screen">
                <Loading keyword={keyword} text={text} textloading={textloading}/>
              </div>
              ) : (
              <div className="result_screen">
                <Result images={images} stories={stories} title={title}/>
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default AudioServer;