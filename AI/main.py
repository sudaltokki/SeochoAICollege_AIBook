import torch
import boto3
import requests
from flask import Flask, request, jsonify
import datetime
import random as rd

from speech_to_text import speech_to_text
from text_to_image import generate_images
from generate_book import generate_story, generate_title, generate_img_prompt

import os

os.environ['KMP_DUPLICATE_LIB_OK']='True'

# Flask
app = Flask(__name__)

# AWS 계정 정보 및 S3 버킷 정보 설정
aws_access_key_id = 'AWS_KEY'
aws_secret_access_key = 'AWS_SECRET_ACCESS_KEY'
bucket_name = 'AWS_BUCKET_NAME'
bucket_url = 'BUCKET_URL'

# S3 클라이언트 생성
s3 = boto3.client('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)


# s3에서 webm 데이터 받아오기
def get_webm_from_s3(s3_audio_url, audio_file_path):

    try:
        response = requests.get(s3_audio_url)
        if response.status_code == 200:
            with open(audio_file_path, 'wb') as local_file:
                local_file.write(response.content)
            print(f"오디오 파일이 다운로드되었습니다. 로컬 파일 경로: {audio_file_path}")
        else:
            print(f"다운로드 중 오류가 발생했습니다. 응답 코드: {response.status_code}")
    except Exception as e:
        print(f"다운로드 중 오류가 발생했습니다: {str(e)}")    


# 동화책을 생성해서 json으로 반환
def generate_book_json(main_char, subject):
    
    page_num = 8 # 동화책 페이지 수 (default = 5)
    medium = ["Sebastian, children's book illustrator, Whimsical and colorful style, Medium: Watercolor, Color Scheme: Bright and lively color palette",
              'cinematic,character design by mark ryden and pixar and hayao miyazaki, unreal 5,',
              'oil pastel', 
              'colored pencil',
              'large pastel, a color pencil sketch inspired by Edwin Landseer', 
              'a storybook illustration by Marten Post'] # 그림 스타일
  
    
    # 동화책 내용 생성
    # sentences: 생성된 동화책 내용(story_result)에서 필요한 문장만 추출해서 list에 저장한 결과
    story_result, sentences = generate_story(main_char=main_char, subject=subject, page_num=page_num)

    # 동화책 제목 생성
    title = generate_title(story=story_result)
    
    # 이미지 생성용 프롬프트 생성 (각 페이지의 그림 상황을 묘사하는 프롬프트)
    img_prompts = generate_img_prompt(story=story_result)
    
    # 그림 스타일 설정
    # 미리 설정한 medium 값 중 하나를 랜덤으로 부여 + 기본 설정값
    setting = ","+ medium[rd.randint(0, len(medium)-1)] +", (Lighting) in warm sunlight, (Artist) in a cute and adorable style, cute storybook illustration, (Color Scheme) vibrant and cheerful"
    
    # 동화책 그림 생성
    torch.cuda.empty_cache()
    imgs = generate_images(img_prompts=img_prompts, setting=setting, title = title)

    
    # 생성한 결과를 다시 s3로 반환하기 위해 json형태로 변환
    response_data = {
        'image_story_pairs': [],
        'title': title,
    }
    
    # 이미지와 문장 쌍을 response_data에 추가
    for i in range(len(imgs)):
        image_story_pair = {
            'image': imgs[i],
            'story': sentences[i]
        }
        response_data['image_story_pairs'].append(image_story_pair)
    
    return jsonify(response_data)


main_char = ""
subject = ""

@app.route("/voice", methods=["GET"])
def voice():
    global main_char, subject

    # s3에서 사용자가 선택한 주인공과 녹음한 음성 파일 주소 받아오기
    main_char = request.args.get("keyword")
    s3_file_url = request.args.get("file_url")

    print("사용자가 선택한 주인공: ",main_char)
    print("사용자가 녹음한 음성 파일 s3 주소: ", s3_file_url)

    # 현재 시각
    current_time = datetime.datetime.now()
    formatted_time = current_time.strftime('%Y%m%d%H%M%S')
    # WebM 파일을 저장할 경로
    audio_file_path = 'data/audio/audio'+formatted_time+'.webm'

    # s3에서 파일을 받아와 위 경로에 저장
    get_webm_from_s3(s3_file_url, audio_file_path)

    # 저장한 파일로 음성인식 수행
    subject = speech_to_text(audio_file_path)

    return subject

@app.route("/book", methods=["GET"])
def book():
    global main_char, subject
    return generate_book_json(main_char, subject)

if __name__ == "__main__":
    app.run(debug=False)