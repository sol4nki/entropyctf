---
license: mit
datasets:
- HuggingFaceFW/fineweb
pipeline_tag: text-generation
---
# Tiny-LLM

A Tiny LLM model with just 10 Million parameters, this is probably one of the small LLM arounds, and it is functional.

## Pretraining

Tiny-LLM was trained on 32B tokens of the Fineweb dataset, with a context length of 1024 tokens.

## Getting Started

To start using these models, you can simply load them via the Hugging Face `transformers` library:

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer


MODEL_NAME = "arnir0/Tiny-LLM"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)

def generate_text(prompt, model, tokenizer, max_length=512, temperature=1, top_k=50, top_p=0.95):
    inputs = tokenizer.encode(prompt, return_tensors="pt")

    outputs = model.generate(
        inputs,
        max_length=max_length,
        temperature=temperature,
        top_k=top_k,
        top_p=top_p,
        do_sample=True
    )


    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return generated_text

def main():
    # Define your prompt
    prompt = "According to all known laws of aviation, there is no way a bee should be able to fly."

    generated_text = generate_text(prompt, model, tokenizer)

    print(generated_text)

if __name__ == "__main__":
    main()
```