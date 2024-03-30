import React, { useState, useEffect } from "react";

import AWS from "aws-sdk";

import "./AudioRecord.css";

const AudioRecord = ({onAudioUrl}) => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [disabled, setDisabled] = useState(true);


  /* // presigned url을 사용안할 때,*/
  const [myBucket, setMyBucket] = useState(null);

  useEffect(() => {
    // AWS 설정
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESSKEYID,
      secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
      region: process.env.REACT_APP_REGION, // 원하는 AWS 리전 설정
    });

    // S3 버킷 객체 생성
    const myBucket = new AWS.S3({
      params: { Bucket: "seocho-voicetest" }, // 사용할 S3 버킷 이름
    });

    setMyBucket(myBucket);
  }, []); 


  const onRecAudio = () => {
    setDisabled(true) // 녹음 -> 재생

    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      
      // AudioBufferSourceNode 연결
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득 후 녹음 시작
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      // 음성 녹음 시작
      analyser.onaudioprocess = function (e) {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 10) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else { // 3분(180초) 안 지났으면 onRec state 값을 False로 변경
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = (blob) => {
    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();
    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();

    setDisabled(false);

    
    media.ondataavailable = function (e) {
      const blob = e.data;

      // 녹음된 음성 데이터를 부모 컴포넌트로 전달
      // onAudioUrl(blob);

      /* // presigned url을 사용안할 때,*/
      if (!myBucket) { // 객체가 존재하지 않을 때
        console.error("S3 bucket is not initialized.");
        return;
      } else {
        const filename = `voice2/audio-${Date.now()}.webm`;

        // 녹음된 음성 Blob 데이터를 S3에 업로드
        const params = {
          ACL: "public-read", // 업로드 파일의 ACL 설정 (public-read: 모든 사용자에게 읽기 권한 부여)
          ContentType: "audio/webm", // 업로드 파일의 컨텐츠 타입
          Body: blob, // 업로드할 파일
          Bucket: "seocho-voicetest", // 사용할 S3 버킷 이름
          Key: filename, // 업로드 파일의 고유 키 (예: 파일명을 고유하게 생성)
        };
        
        let file_url = "https://seocho-voicetest.s3.ap-northeast-2.amazonaws.com/"+ filename;

        myBucket.putObject(params, (err, data) => {
          // myBucket : AWS SDK를 사용하여 생성한 S3 버킷 객체
          // putObject(params, callback) : S3 버킷에 객체를 추가하는 메소드
          if (err) {
            console.error("Error uploading file:", err);
          } else {
            onAudioUrl(file_url);
          }
        });
      } 
    }; 
  };

  return (
    <div>
      <button type="button" onClick={onRec ? onRecAudio : offRecAudio} className="img_button_mic"/>
    </div>
  );

};

export default AudioRecord;