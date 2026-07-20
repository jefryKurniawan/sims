# Alias untuk ngoding harian (Flash - cepat, hemat NIM)
alias aider-code 'command aider --read CONVENTIONS.md --model nvidia_nim/deepseek-ai/deepseek-v4-flash --edit-format udiff'

# Alias untuk mikir berat (Architect mode - Pro/Ultra)
alias aider-think 'command aider --read CONVENTIONS.md --architect --model nvidia_nim/deepseek-ai/deepseek-v4-pro --weak-model nvidia_nim/deepseek-ai/deepseek-v4-flash'

# Alias khusus debug (Tanya jawab saja, tidak boleh edit)
alias aider-debug 'command aider --read CONVENTIONS.md --ask --model nvidia_nim/nvidia/nemotron-3-super-120b-a12b'
