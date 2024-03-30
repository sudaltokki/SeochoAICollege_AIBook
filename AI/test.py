import torch
import random as rd

#from speech_to_text import speech_to_text
from text_to_image import generate_images
from generate_book import generate_story, generate_title, generate_img_prompt

def main():

    main_char = "고양이 키키" # 동화책 주인공
    page_num = 8 # 동화책 페이지 수 (default = 5)
    wav_file_path = 'data/audio/test_audio.wav' # wav 형식의 audio file
    medium = ["Sebastian, children's book illustrator, Whimsical and colorful style, Medium: Watercolor, Color Scheme: Bright and lively color palette",
              'cinematic,character design by mark ryden and pixar and hayao miyazaki, unreal 5,',
              'oil pastel', 
              'colored pencil',
              'large pastel, a color pencil sketch inspired by Edwin Landseer', 
              'a storybook illustration by Marten Post'] # 그림 스타일

    # 음성인식(speech to text)
    #subject = speech_to_text(wav_file_path)   
    
    # 동화책 내용 생성
    #story_result, _ = generate_story(main_char=main_char, subject=subject, page_num=page_num)
    story_result, _ = generate_story(main_char=main_char, subject="공부는 어려워", page_num=page_num)


    # 동화책 제목 생성
    title = generate_title(story=story_result)
    
    # 이미지 생성용 프롬프트 생성 (각 페이지의 그림 상황을 묘사하는 프롬프트)
    img_prompts = generate_img_prompt(story=story_result)
    
    # 그림 스타일 설정
    # 미리 설정한 medium 값 중 하나를 랜덤으로 부여 + 기본 설정값
    #setting = ","+ medium[rd.randint(0, len(medium)-1)] +", (Lighting) in warm sunlight, (Artist) in a cute and adorable style, cute storybook illustration, (Color Scheme) vibrant and cheerful"
    setting = ","+ medium[3] +", (Lighting) in warm sunlight, (Artist) in a cute and adorable style, cute storybook illustration, (Color Scheme) vibrant and cheerful"
    
    # 동화책 그림 생성
    torch.cuda.empty_cache()
    generate_images(img_prompts=img_prompts, setting=setting, title = title)
    

if __name__ == "__main__":
    main()