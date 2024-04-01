<div align="center">
<h1> [인공지능이 만드는 아이들의 그림 동화책] 아이북 AI-Book </h1>

<img src="https://github.com/sudaltokki/SeochoAICollege_AIBook/assets/86659995/9693e807-f036-46aa-bcaa-8893ee33689b" width="570" />
</div>

<br>

<div align="center">
    <h2> 📖 Overview </h2>
</div>

아이들은 그림 동화책을 통해 '즐거움'과 동시에 '세상을 이해하는 경험'을 얻는다. 동화 속에서 마주치는 다양한 상황 속에서 아이들은 새로운 어휘를 익히고 다른 사람의 감정과 관점을 이해하게 된다. '아이북'은 사용자가 원하는 주제에 AI의 지능과 창의력을 더해 다양한 스토리와 풍부한 표현력을 가진 그림을 보여준다. 아이들의 성장 과정에서 디지털 툴을 활용해 창의력과 언어 학습 능력을 향상시킬 수 있도록 하는 도구를 만들고자 한다.

- Problem Definition
  
- Main features
    - 소아/유아 음성인식에 특화된 STT(Speech to Text) Model 개발
    - Prompt Engineering
        - 사용자가 직접 지정한 주인공과 주제를 기반으로 개인화된 동화책 생성
        - 소아/유아에게 적합한 동화책 내용과 이미지 생성
  
- 사용자 설정에 따라 **개인화된 동화책**을 생성하는 인공지능 기반의 웹 서비스입니다.
- 사용자는 직접 동화책의 주인공과 주제를 선택할 수 있습니다.
- 서비스의 주 사용자가 소아 혹은 유아일 것을 고려하여 사용자가 말하는 주제를 음성인식으로 받아오도록 기획하였다. 그리고 정확한 음성인식을 위해 Speech to Text 모델인 **OpenAI의 Whisper**을 **fine-tuning**하여 소아/유아 음성에 더 적합한 모델을 개발하였습니다.
- **GPT-4**와 **Stable diffusion**을 사용해 동화책의 제목, 내용, 그림을 생성하였습니다.

<br>

<div align="center">   
    <h2> 🙋‍♂️ Team </h2>
<div>
    
|박지원|정하성|임동희|박주은|
| :--------: | :--------: | :--------: | :--------: | 
|<img src="https://github.com/sudaltokki.png" width="120" height="120"/>|<img src="https://github.com/HaseongJung.png" width="120" height="120"/>|<img src="https://github.com/star1sh.png" width="120" height="120"/>|<img src="" width="120" height="120"/>|
|[@sudaltokki](https://github.com/sudaltokki)|[@HaseongJung](https://github.com/)|[@star1sh](https://github.com/star1sh)|[@](https://github.com/)|
|Team Leader, AI|AI|AI|Frontend|

</div>

</div>

<br>

<div align="center">  
    <h2> 🔧 Stacks </h2>
</div>

### AI
![Pytorch](https://img.shields.io/badge/Pytorch-EE4C2C?style=for-the-badge&logo=Pytorch&logoColor=white) 
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=OpenAI&logoColor=white) 
![HuggingFace](https://img.shields.io/badge/HuggingFace-F7CB1D?style=for-the-badge&logo=HuggingFace&logoColor=white) 

### Frontend/Backend
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=ffffff)
![Spring](http://img.shields.io/badge/-Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=ffffff)

### Communication
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)
![GoogleMeet](https://img.shields.io/badge/GoogleMeet-00897B?style=for-the-badge&logo=Google%20Meet&logoColor=white)
  
<br>

<div align="center">  
    <h2> Whisper Fine-tuning </h2>
</div>

- Whisper모델을 fine-tuning할 때 사용할 음성 데이터를 전처리한다
    
    → `병렬처리를 통해 기존 소요시간의 1/10 이상 감소`
    
- Open AI의 Whisper모델을 fine-tunging하여 유아 음성의 인식률을 개선한다
    
    → `Cer(음절 오류율) 기준:  11.9 → 1.08`
    
- 전처리한 데이터셋과 fine-tuning한 모델들을 Hugging-face hub를 통해 관리한다.
    
    [haseong8012/whisper-large-v2_child10K_LoRA · Hugging Face](https://huggingface.co/haseong8012/whisper-large-v2_child10K_LoRA)
    
- Stable Diffusion에서의 생성하는 이미지의 품질을 향상시키고, 생성시간을 단축시킨다.
    
    `기존 이미지 1장 당 25초 → 12초`
    
<br>

<div align="center">  
    <h2> Dataset </h2>
</div>

AI Hub에서 제공하는 ‘명령어 음성(소아, 유아)’ 데이터를 사용한다.

데이터에는 각 음성의 오디오 파일(wave)과 전사정보를 포함한 파일(json)이 존재한다.

[AI-Hub](https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&aihubDataSe=data&dataSetSn=95)

<br>

<div align="center">  
    <h2> Preprocessing </h2>
</div>

1. 데이터의 전사정보(json)에서 필요없는 괄호, 특수문자 및 노이즈 표기 등을 제거한다.
2. 데이터의 오디오 파일(wave)을 `48kHz→16kHz` resampling 및 Z-socre정규화를 진행한다.
3. 각 매칭되는 음성파일(wave)와 전사정보 파일(json)의 인덱스를 동일하게 하여, `audio` 와 `text` 두 개의 컬럼으로 이루어진 데이터셋을 구축한다.
4. 구축한 Dataset은 Hugging-face hub에 업로드하여 관리한다.

적게는 10,000개 많게는 2,070,000개로 이루어지고 용량이 큰 음성 데이터의 특성 상 엄청난 리소스와 소요시간이 발생한다.

→ multiprocessing&parmap을 이용한 병렬처리를 통해 프로세서를 최대로 사용하여 `기존 소요시간의 1/10 이상 단축`하였다.

<br>

<div align="center">  
    <h2> Whisper fine-tuning </h2>
</div>

![whisper성능](https://github.com/HaseongJung/AIBook/assets/107913513/2b744cd2-7dd5-4aef-841a-194bf289a827)

OpenAI의 whisper 모델 성능

![Whisper 모델 Size별 정보](https://github.com/HaseongJung/AIBook/assets/107913513/c802dc80-1ba8-4411-a5b0-d0627becd600)

Whisper 모델 Size별 정보

- 대량의 다양한 언어들로 사전 학습됨
    
    → 일반 남여의 음성에 대한 기본적인 성능 보장
    
- 주요 언어가 아닌 한국어에서는 비교적 낮은 인식도
    
    → fine-tuning시 성능이 향상된 연구를 통해 가능성 확인
    

![whisper 아키텍처](https://github.com/HaseongJung/AIBook/assets/107913513/c8cb4e4a-9e18-4752-b474-8e1c478db001)

Whisper 모델 아키텍처

![fine-tuning시 고려할 변수](https://github.com/HaseongJung/AIBook/assets/107913513/4f611314-335d-4735-838c-a4a99ec801ee)

fine-tuning시 고려할 변수

Whisper fine-tunging 가이드를 참고하여, Batch size, Learning rate 및 dropout 등과 같은 하이퍼 파라미터는 공식 문서 및 선행 연구자의 결과에서 도출한 조언에 따라 각 환경에 맞추어서 진행하였다. https://github.com/huggingface/community-events/tree/main/whisper-fine-tuning-event#recommended-training-configurations

![Data augmentation 및 lr scheduler에 따른 성능 비교](https://github.com/HaseongJung/AIBook/assets/107913513/4d4a9764-2c0e-414b-a62c-209f83029536)

Data augmentation 및 lr scheduler에 따른 성능 비교

![Train dataset size에 따른 성능 비교](https://github.com/HaseongJung/AIBook/assets/107913513/babcdefd-8a5a-415d-ab37-5aba3d1e6bb5)

Train dataset size에 따른 성능 비교

![fine-tuned Whisper-small (child-50k, linear, adamW)](https://github.com/HaseongJung/AIBook/assets/107913513/2688d21c-2371-44b2-82c6-931655ea61a3)

fine-tuned Whisper-small (child-50k, linear, adamW)

데스크탑 사양 제약에 따라 Whisper tiny/small에 대한 test 및 성능 비교 진행하였다.

최종적으로 augmentaion을 진행하지 않고, linear lr scheduler, 10k의 데이터셋을 사용하여 fine-tuning하는 것이 성능이 가장 좋은 것으로 판단하였다.

<br>

<div align="center">  
    <h2> LoRA fine-tuning </h2>
</div>

tiny/small 모델을 비교하였을 때, 모델 사이즈에 따라 성능 차이가 큰 것을 확인 후, 제약 된 환경에서 Whisper-large모델을 fine-tuning할 수 있는 방법을 모색 중 `LoRA fine-tuning`기법을 발견하였다.

사전 학습된 대규모 언어 모델의 가중치 행렬을 구성하는 모든 가중치를 미세 조정하는 대신, 이 큰 행렬을 근사화하는 두 개의 작은 행렬을 미세 조정하는 개선된 미세 조정 방식이다.

![fine-tuned Whisper large-v2 (Best model)](https://github.com/HaseongJung/AIBook/assets/107913513/c11b5dc9-7366-4941-b977-8d3067046e8d)  

fine-tuned Whisper large-v2 (Best model)

이후 Hugging-face에서 제공하는 [PEFT](https://github.com/huggingface/peft)라이브러리를 통하여 한정된 GPU Ram에서 하지 못했던 Whisper-large-v2모델을 RoLA fine-tuning한 결과 child/general 음성 모두에서 최상의 성능을 뽑아내었다.

<br>

<div align="center">  
    <h2> 동화책 생성 </h2>
</div>

<div align="center">  
    <h3> Flowchart </h3>
    <img width="600" src="https://github.com/sudaltokki/SeochoAICollege_AIBook/assets/86659995/df644c2c-77cb-481c-897e-4f2b341666cf"/ >
</div>
</div>

<br>

<div align="center">  
    <h2> Stable Diffusion </h2>
</div>
<img width="600" src="https://github.com/HaseongJung/AIBook/assets/107913513/d96faf51-2dd8-4989-8803-94fd781d93fa"/ >

Stable Diffusion - user preference chart

기존에 [Diffusers](https://huggingface.co/stabilityai/stable-diffusion-xl-refiner-1.0)라이브러리에서 제공하는 `Stable Diffusion-XL 1.0`모델을 사용하여 이미지를 생성하였을 때, `1장 당 약 25초`가 소요되었다.

→ 기존의 50추론단계를 필요로 하는 **[PNDMScheduler](https://huggingface.co/docs/diffusers/v0.26.3/en/api/schedulers/pndm#diffusers.PNDMScheduler)**를 20~25추론단계를 필요로 하는 **[DPMSolverMultistepScheduler](https://huggingface.co/docs/diffusers/v0.26.3/en/api/schedulers/multistep_dpm_solver#diffusers.DPMSolverMultistepScheduler)**로 변경하여 성능을 유지한 채 `이미지 생성시간을 단축`하였다.

→ 기존 SDXL 1.0모델에 refiner모듈을 추가하여 `이미지의 품질을 향상`시켰다.

이미지 1장 당 총 소요시간: SDXL1.0 (약 6초) +refiner(약 6초) = 약 12초 

<br>

<div align="center">  
<h2> 📺 UI </h2>
    
<div>
        
| 홈 화면 | 주인공 선택 |
| :--------: | :--------: | 
|  <img width="329" src="https://github.com/sudaltokki/SeochoAICollege_AIBook/assets/86659995/e47bfcb1-83ee-46d5-bd7b-8945d1bc48eb"/> |  <img width="329" src="https://github.com/sudaltokki/SeochoAICollege_AIBook/assets/86659995/21a2fca2-39ac-48a9-9447-47b661dfdbb3"/>| 

| 주제 설정 (음성인식) | 생성중 | 생성 완료 |
| :--------: | :--------: | :--------: |
| <img width="329" src="https://github.com/sudaltokki/SeochoAICollege_AIBook/assets/86659995/03b52fb8-a907-4614-a789-a06f56e0bdd9"/>   |  <img width="329" src="https://github.com/sudaltokki/SeochoAICollege_AIBook/assets/86659995/760c2936-80d4-45de-b9f4-1590728fdaf2"/>     |  <img width="329" src="https://github.com/sudaltokki/SeochoAICollege_AIBook/assets/86659995/0f66327d-eb74-40b8-906c-277617408964"/>     |

</div>
    
</div>

<br>

<div align="center">  
    <h2> 🎯 Achievements </h2>
</div>

- [2023 서초 AI칼리지 프로젝트 캡스톤 발표](https://www.newsis.com/view/id=NISI20231027_0020107088) 
- 2023 서초 AI칼리지 프로젝트 과정 우수팀 선정
- **HCI KOREA 2024 학술대회 논문 게재 및 포스터 발표**
    - [생성형 AI 기반의 동화책 제작 서비스 설계 및 구현. 한국HCI학회 학술대회. 한국HCI학회. pp. 845-850. 2024.](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11714752)

<div align="center">  
    <img width="570" src="https://github.com/sudaltokki/SeochoAICollege_AIBook/assets/86659995/cf71e321-ecd3-4bfc-b3ea-902b7bacc85c"/>
</div>

<br>

<div align="center">  
    <h2> 🎞️ Demo </h2>
</div>

- 현재 개발한 웹서비스가 배포되어있지 않으므로 로컬에서 실행할 수 있도록 test.py 코드를 올려두었습니다.
- cuda를 사용할 수 있는 가상환경에서 실행해주세요.
- audio file을 사용하는 과정에서 **ffmpeg 코텍 설치**가 필요합니다. [링크](https://doa-oh.tistory.com/170?category=757135)를 참고해서 설치해주세요.
- SeochoAICollege_AIBook/AI/generate_book.py 에서 **OpenAI api key**를 넣고 사용해주세요.

```
git clone https://github.com/sudaltokki/SeochoAICollege_AIBook.git
cd SeochoAICollege_AIBook/AI
pip install -r requirements.txt
python test.py
```

<div align="center">  
    <h3> colab으로 간단하게 실행하기 </h3>
</div>
