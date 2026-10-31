# Os Códigos da Disciplina · página de vendas

Site estático (HTML, imagens e fontes). Não tem build: o Cloudflare publica os arquivos como estão.

## Estrutura

```
index.html          página de vendas
termos.html         termos de uso  (abre em /termos)
privacidade.html    política de privacidade  (abre em /privacidade)
img/                imagens (hero, retrato, imagem de compartilhamento)
fonts/              fontes Inter e Space Grotesk, hospedadas junto
_headers            cache das fontes e imagens no Cloudflare
robots.txt          libera a página para buscadores
```

## Publicar no Cloudflare Pages

1. Suba esta pasta para um repositório no GitHub (os arquivos na raiz do repositório).
2. No Cloudflare: Workers & Pages → Create → Pages → Connect to Git → escolha o repositório.
3. Configuração do build:
   - Framework preset: **None**
   - Build command: **deixe vazio**
   - Build output directory: **/**
4. Save and Deploy. Cada novo commit na branch principal publica de novo sozinho.
5. Para usar o seu domínio: no projeto, Custom domains → Set up a custom domain.

## Domínio

O site já está configurado para **lukanero.com.br** (og:url, og:image e canonical no `index.html`). Depois de comprar o domínio:

1. No Cloudflare, adicione o domínio (Add a site) e troque os servidores DNS no Registro.br pelos que o Cloudflare indicar.
2. No projeto do Pages: Custom domains → Set up a custom domain → `lukanero.com.br`. Repita com `www.lukanero.com.br`.
3. Teste o compartilhamento em https://developers.facebook.com/tools/debug/ colando o link.

## Dados da página

- Checkout: https://pay.herospark.com/os-codigos-da-disciplina-549452
- Meta Pixel: 2618686061904510 (PageView em todas as páginas, InitiateCheckout no botão da oferta)
- Preço: R$ 197 à vista ou 12x de R$ 20,40
