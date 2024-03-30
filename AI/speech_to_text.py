import torch
from transformers import (
    WhisperProcessor,
    WhisperForConditionalGeneration,
    AutomaticSpeechRecognitionPipeline,
    WhisperForConditionalGeneration,
    WhisperTokenizer,
    WhisperProcessor,
)
from peft import PeftModel, PeftConfig

import subprocess
import os

# finetuned whisper model
peft_model_id = "whisper-model" # Use the same model ID as before.
language = "ko"
task = "transcribe"

# Parameter-Efficient Fine-Tuning(peft)
peft_config = PeftConfig.from_pretrained(peft_model_id)
model = WhisperForConditionalGeneration.from_pretrained(
    peft_config.base_model_name_or_path, load_in_8bit=True, device_map="auto"
)
model = PeftModel.from_pretrained(model, peft_model_id)

tokenizer = WhisperTokenizer.from_pretrained(peft_config.base_model_name_or_path, language=language, task=task)
processor = WhisperProcessor.from_pretrained(peft_config.base_model_name_or_path, language=language, task=task)
feature_extractor = processor.feature_extractor
forced_decoder_ids = processor.get_decoder_prompt_ids(language=language, task=task)

stt_model = AutomaticSpeechRecognitionPipeline(model=model, tokenizer=tokenizer, feature_extractor=feature_extractor)

# s3에서 받아온 webm 파일을 wav 파일로 변환
# ffmpeg 설치 후 환경변수 설정 필요
def webm_to_wav(filename, wav_path):
    ffmpeg_command = [
    'ffmpeg',  # ffmpeg 실행 명령어
    '-i', filename,  # 입력 파일 경로
    '-vn',  # 비디오 스트림 무시
    '-acodec', 'pcm_s16le',  # 오디오 코덱 설정 (16-bit PCM)
    '-ar', '16000',  # 샘플링 레이트 설정 (예: 44100 Hz)
    '-ac', '1',  # 채널 수 설정 (2 채널 = 스테레오)
    wav_path  # 출력 파일 경로
    ]
    subprocess.run(ffmpeg_command,stdout=subprocess.PIPE,stdin=subprocess.PIPE)
       
def speech_to_text(audio_path):

    # 만약 파일이 webm 형식이라면 wav로 변환 (main.py에 해당)
    if os.path.splitext(audio_path)[1].lower() == '.webm':
        new_path = 'data/audio/'+os.path.splitext(audio_path)[0]+'.wav'
        webm_to_wav(audio_path, new_path)

    with torch.cuda.amp.autocast():
        text_result = stt_model(audio_path, generate_kwargs={"forced_decoder_ids": forced_decoder_ids}, max_new_tokens=255)["text"]
    print("음성인식 결과: ", text_result)

    return text_result