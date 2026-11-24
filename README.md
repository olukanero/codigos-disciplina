# Os Códigos da Disciplina · site

Site estático (HTML e imagens) com uma função do Cloudflare para guardar os e-mails da isca na Brevo. Não tem build: o Cloudflare publica os arquivos como estão.

## Estrutura

```
index.html            página de vendas                    (abre em /)
diagnostico.html      isca: Diagnóstico dos Sabotadores   (abre em /diagnostico)
obrigado.html         página de obrigado                  (abre em /obrigado, fora do Google)
termos.html           termos de uso                       (abre em /termos)
privacidade.html      política de privacidade             (abre em /privacidade)
design_tokens.css     cores, fontes e medidas do Design System do Luka
functions/api/contato.js   recebe o e-mail da isca e guarda na Brevo (abre em /api/contato)
img/                  imagens do site (lista abaixo)
fonts/                fontes Inter, Space Grotesk e ícones
_headers              cache das fontes e imagens e cabeçalhos de segurança no Cloudflare
robots.txt            libera o site para buscadores
sitemap.xml           as páginas públicas, para o Google
```

## As imagens

Ficam na pasta `img/`, com o nome exato. Enquanto uma imagem não existe, a página mostra uma caixa cinza com a medida no lugar dela.

| Arquivo | Onde aparece | Medida | Peso máximo |
|---|---|---|---|
| `hero-desktop.webp` | Fundo do topo, no computador | 1920 × 1080 | 200 KB |
| `hero-mobile.webp` | Fundo do topo, no celular | 1080 × 1920 | 200 KB |
| `luka-retrato.webp` | “Quem vai te ensinar” | 960 × 1200 | 120 KB |
| `bonus-1.webp`, `bonus-2.webp`, `bonus-3.webp` | Cards dos bônus | 800 × 600 | 60 KB |
| `produto.webp` | Card da oferta | 1120 × 630 | 90 KB |
| `luka.webp` | Avatar do Luka na isca | 192 × 192 | 15 KB |
| `compartilhar.jpg` | Prévia do link nas redes | 1200 × 630 | 150 KB |
| `favicon-32.png` | Ícone da aba | 32 × 32 | 2 KB |
| `apple-touch-icon.png` | Ícone na tela do celular | 180 × 180 | 15 KB |

## As fontes

Ficam na pasta `fonts/`, hospedadas junto com o site, sem chamar o Google: `inter.woff2` e `space-grotesk.woff2` (variáveis, só caracteres latinos) e `icones.woff2` (recorte da Material Symbols Rounded com os 8 ícones usados). O `_headers` guarda as fontes em cache por um ano.

## Publicar no Cloudflare Pages

O projeto `codigos-disciplina` já está ligado ao repositório `olukanero/codigos-disciplina`. Cada commit na branch `main` publica de novo sozinho, em 1 ou 2 minutos.

Configuração do build: Framework preset **None**, Build command **vazio**, Build output directory **/**.

Para atualizar: no GitHub, Add file → Upload files, arraste o conteúdo desta pasta (a pasta `functions` inteira, para manter o caminho `functions/api/contato.js`) e Commit changes.

## E-mails da isca (Brevo)

A isca manda o e-mail e o resultado para `/api/contato`. A função guarda o contato na lista da Brevo, com os atributos SABOTADOR, SEGUNDO_SABOTADOR, HABITO, ROTA, ORIGEM e DATA_DIAGNOSTICO.

Variáveis no Cloudflare (projeto → Settings → Variables and secrets):

* `BREVO_API_KEY`: a chave da API da Brevo, do tipo Secret
* `BREVO_LIST_ID`: o número da lista (7, “Sabotadores”)

Uma variável nova ou alterada só vale a partir do próximo deploy.

## Dados da página

- Domínio: lukanero.com.br
- Checkout: https://pay.cakto.com.br/jumcz2o_1355863
- Preço: R$ 197 à vista ou 12x de R$ 20,43

## De onde vêm os arquivos

As páginas são geradas na pasta do projeto, fora deste repositório:

- `diagnostico.html`: `02.funil/01.isca/_gerador/gerar_isca.py`, a partir da copy da isca
- `termos.html` e `privacidade.html`: `02.funil/04.outras/gerar_paginas_legais.py`
- `design_tokens.css`: cópia de `03.persona/01.brand/design_tokens.css`

Edite a fonte e gere de novo, em vez de mexer direto no HTML.
