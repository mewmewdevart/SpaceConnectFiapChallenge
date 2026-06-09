import os
import re

# Defina a pasta raiz do projeto
root_dir = r"c:\Users\Mew\Desktop\Estudos\Faculdade - Web Design\SpaceConnectFiapChallenge"

replacements = [
    (r'var\(--cyan\)', r'var(--steel)'),
    (r'var\(--cyan-alt\)', r'var(--steel)'),
    (r'var\(--mint\)', r'var(--success)'),
    (r'var\(--teal\)', r'var(--water)'),
    (r'var\(--lime\)', r'var(--success)'),
    (r'var\(--green\)', r'var(--success)'),
    (r'var\(--yellow\)', r'var(--warning)'),
    (r'var\(--salmon\)', r'var(--critical)'),
    (r'var\(--magenta\)', r'var(--brand-primary)'),
    (r'var\(--purple\)', r'var(--brand-secondary)'),
    (r'var\(--orange\)', r'var(--energy)'),
    (r'var\(--white\)', r'var(--text-primary)'),
    (r'var\(--black\)', r'var(--space-black)'),
    (r'var\(--glow-cyan\)', r'none'),
    (r'var\(--glow-green\)', r'none'),
    (r'var\(--glow-salmon\)', r'none'),
    (r'var\(--hud-line\)', r'transparent'),
]

# Substituições de box-shadows com cores de variáveis (transformar em sombras de profundidade preta)
box_shadow_pattern = re.compile(r'box-shadow:\s*[^;]+rgba\(var\(--(steel|success|water|warning|critical|brand-primary|brand-secondary|energy)\)[^;]+;')

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    # 1. Substituições de variáveis mapeadas
    for old, new in replacements:
        new_content = re.sub(old, new, new_content)

    # 2. Substituir drop-shadows e box-shadows coloridos
    # Por exemplo: box-shadow: 0 0 10px rgba(var(--steel), 0.5);
    # Regex para achar e limpar box-shadows coloridos após as trocas de nomes.
    # Na verdade, como a gente quer mudar tudo para Material Design (sem brilho colorido),
    # qualquer box-shadow que tenha rgba(var(--algumacor), algo) pode virar rgba(0, 0, 0, 0.5)
    
    # Substituir rgba(var(--algumacor), valor) DENTRO de regras de sombra (que tem text-shadow, box-shadow ou drop-shadow)
    
    def repl_shadow(match):
        full_shadow = match.group(0)
        # Substitui a cor por preto na sombra
        return re.sub(r'rgba\(var\(--[^)]+\),\s*[0-9.]+\)', r'rgba(0, 0, 0, 0.5)', full_shadow)

    new_content = re.sub(r'(box-shadow|text-shadow|drop-shadow)[^;}]*rgba\(var\(--[^)]+\),\s*[0-9.]+\)[^;}]*', repl_shadow, new_content)
    
    # Tira cores neon diretas
    new_content = new_content.replace('#00ffff', 'rgb(var(--steel))')
    new_content = new_content.replace('#00e1ff', 'rgb(var(--steel))')
    new_content = new_content.replace('#6df7c1', 'rgb(var(--success))')
    new_content = new_content.replace('#c92464', 'rgb(var(--brand-primary))')
    new_content = new_content.replace('#6a3771', 'rgb(var(--brand-secondary))')

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Modificado: {filepath}")

for subdir, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith(('.css', '.html', '.js')) and "variables.css" not in file:
            process_file(os.path.join(subdir, file))

print("Migração de variáveis concluída via regex.")
