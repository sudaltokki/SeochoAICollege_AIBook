import sys
import time
import openai
from openai import OpenAI
import re

# openai api key
openai_api_key = "OPENAI_KEY"
client = OpenAI(
    api_key = openai_api_key,
)

def load_template(type):
    with open('prompt/prompt_for_'+type+'.txt', 'r', encoding='utf-8') as f:
        return f.read()
    
def make_gpt_format(query: str = None):
    message = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": query}
    ]
    return message

def gpt4(
        main_char: str = None, # 주인공
        subject: str = None, # 대주제 (음성인식결과)
        story: str = None, # 생성된 동화책 스토리 (제목 생성을 위해 사용)
        page_num: int = 5, # 동화책 페이지 수
        model_name: str = "gpt-4", # 사용한 openai api model
        max_len: int = 4000,
        temp: float = 1.0,
        n: int = 1,
        freq_penalty: float = 0.0,
        pres_penalty: float = 0.0,
        top_p: float = 1.0,
        type: str = '1',
    ):
    if not story and not (main_char and subject):
        raise ValueError("There is no query sentence!")
    

    prompt_template = load_template(type)
    prompt = prompt_template.format(main_char=main_char, subject=subject, story=story, page_num=page_num)
    messages = make_gpt_format(prompt)

    response = None
    received = False
    while not received:
        try:
            response = client.chat.completions.create(
                model=model_name,
                messages=messages,
                max_tokens=max_len,
                temperature=temp,
                n=n,
                presence_penalty=pres_penalty,
                frequency_penalty=freq_penalty,
                top_p=top_p,
            )
            received = True
        except openai.OpenAIError as e:
            print(f"OpenAIError: {e}.")
            error = sys.exc_info()[0]
            if error == openai.BadRequestError:
                # something is wrong: e.g., prompt too long
                print(f"BadRequestError\nPrompt passed in:\n\n{messages}\n\n")
                assert False
            time.sleep(2)

    resp = response.choices[0].message.content

    return resp

def get_sentence(sentences):
    sentence_list = []
    pages = sentences.split('\n')

    for page in pages:
        if page.strip():
            sentence = page.split(': ')[1]
            sentence_list.append(sentence)
    
    return sentence_list

def get_title(title):
    pattern = r'제목:\s+"([^"]+)"'
    match = re.search(pattern, title)  

    if match:
        title = match.group(1)
    else:
        print("제목을 찾을 수 없습니다.")

    return title


# 동화책 내용 생성
def generate_story(main_char, subject, page_num):
    story_result = gpt4(main_char=main_char, subject=subject, page_num=page_num, type='story')
    print('[동화책 내용]\n',story_result)

    # 결과에서 필요한 텍스트만 추출
    sentences = get_sentence(story_result)

    return story_result, sentences

# 동화책 제목 생성
def generate_title(story):

    title_result = gpt4(story=story, type='title')
    title_result = re.sub(r'[^\w\s]', '', title_result) # 특수문자 제거
    print('[동화책 제목]\n',title_result)

    return title_result

# 페이지별 그림의 장면 묘사 프롬프트 생성
def generate_img_prompt(story):

    img_prompt_result = gpt4(story=story, type='img')
    print('[동화책 그림]\n',img_prompt_result)

    # 결과에서 필요한 텍스트만 추출
    img_prompt_result = get_sentence(img_prompt_result)
    
    return img_prompt_result

