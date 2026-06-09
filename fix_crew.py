import os

file_path = os.path.join('assets', 'js', 'pages', 'crew.js')

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'Renderiza\ufffd\ufffdo Din\ufffdmica': 'Renderização Dinâmica',
    'Comandante da Miss\ufffdo': 'Comandante da Missão',
    'Supervis\ufffdo Geral': 'Supervisão Geral',
    'Comunica\ufffd\ufffdes': 'Comunicações',
    'Aprova\ufffd\ufffdo de Aloca\ufffd\ufffdo': 'Aprovação de Alocação',
    't\ufffdtica est\ufffdvel': 'tática estável',
    'Oficial de Opera\ufffd\ufffdes': 'Oficial de Operações',
    'Simula\ufffd\ufffdes de Pressuriza\ufffd\ufffdo': 'Simulações de Pressurização',
    'Log\ufffdstica': 'Logística',
    'relat\ufffdrio de log\ufffdstica': 'relatório de logística',
    'Manuten\ufffd\ufffdo': 'Manutenção',
    'Irriga\ufffd\ufffdo': 'Irrigação',
    'Reciclagem de \ufffdgua': 'Reciclagem de Água',
    'efici\ufffdncia h\ufffddrica': 'eficiência hídrica',
    'Engenheiro El\ufffdtrico': 'Engenheiro Elétrico',
    'Ci\ufffdncia': 'Ciência',
    'N\ufffdveis': 'Níveis',
    'T\ufffdcnica': 'Técnica',
    'SA\ufffdDE': 'SAÚDE',
    'n\ufffdo tiver': 'não tiver',
    'Exp\ufffde a fun': 'Expõe a fun',
    'Pagina\ufffd\ufffdo': 'Paginação'
}

for bad, good in replacements.items():
    content = content.replace(bad, good)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed crew.js")
