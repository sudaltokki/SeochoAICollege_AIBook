import torch
from diffusers import DiffusionPipeline, StableDiffusionXLImg2ImgPipeline, DPMSolverMultistepScheduler
import datetime

# stable diffusion model

# load both base & refiner
sd_base = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0", torch_dtype=torch.float16, use_safetensors=True, variant="fp16")
sd_base.scheduler = DPMSolverMultistepScheduler.from_config(sd_base.scheduler.config) #  PNDMScheduler -> DPMSolverMultistepScheduler로 변경, 이 스케줄러는 성능이 더 뛰어나 적은 inference step을 필요로 함
sd_base.to("cuda")
#sd_base.enable_model_cpu_offload()

sd_refiner =  StableDiffusionXLImg2ImgPipeline.from_pretrained(
    "stabilityai/stable-diffusion-xl-refiner-1.0", torch_dtype=torch.float16, variant="fp16", use_safetensors=True
)
sd_refiner.scheduler = DPMSolverMultistepScheduler.from_config(sd_refiner.scheduler.config)
sd_refiner.to("cuda")
#sd_refiner.enable_model_cpu_offload()

generator = torch.Generator("cuda").manual_seed(42)

# 이미지 한 개 생성
def generate_image(text, title, idx):

    print(text)

    # run both experts
    init_image = sd_base(prompt=text, generator=generator, num_inference_steps=20).images[0]
    refined_image = sd_refiner(prompt=text, generator=generator, image=init_image, num_inference_steps=20).images[0]

    # save image
    current_time = datetime.datetime.now()
    formatted_time = current_time.strftime('%Y%m%d%H%M%S')
    image_file_path = 'data/image/'+title+'_'+str(idx)+'_'+formatted_time+'.jpg'
    refined_image.save(image_file_path)
    
    return refined_image

# 모든 이미지 생성
def generate_images(img_prompts, setting, title):
    imgs = []
    for i in range(len(img_prompts)):
        imgs.append(generate_image(text = img_prompts[i]+setting, title = title, idx = i))
    return imgs
