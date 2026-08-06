from pathlib import Path
import re
 
entrada = Path("estilos.css")
saida = Path("estilos.min.css")
 
css = entrada.read_text(encoding="utf-8")
css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
css = re.sub(r"\s+", " ", css)
css = re.sub(r"\s*([{}:;,])\s*", r"\1", css)
css = css.replace(";}", "}").strip()
 
saida.write_text(css, encoding="utf-8")
print(f"Arquivo gerado: {saida}")
print(f"Tamanho original: {entrada.stat().st_size} bytes")
print(f"Tamanho minificado: {saida.stat().st_size} bytes")
