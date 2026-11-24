/* Recebe o e-mail da isca (/diagnostico) e guarda o contato na Brevo.
   Roda no Cloudflare Pages, em /api/contato. A chave da Brevo fica no Cloudflare,
   nunca no HTML.

   Variáveis no Cloudflare (Settings → Variables and Secrets):
     BREVO_API_KEY   a chave da API da Brevo (tipo "Secret")
     BREVO_LIST_ID   o número da lista onde o contato entra (ex.: 3)

   Atributos que a Brevo recebe (crie com estes nomes em Contatos → Configurações → Atributos,
   todos do tipo Texto): SABOTADOR, SEGUNDO_SABOTADOR, HABITO, ROTA, ORIGEM, DATA_DIAGNOSTICO.
   Se algum não existir, o contato é salvo mesmo assim, só com o e-mail e a lista. */

const ORIGENS = ["https://lukanero.com.br", "https://www.lukanero.com.br"];
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const resposta = (status, corpo) =>
  new Response(JSON.stringify(corpo), { status, headers: { "Content-Type": "application/json" } });

const texto = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function onRequestPost({ request, env }) {
  // Só aceita envios vindos do próprio site (ou de uma prévia do Pages).
  const origem = request.headers.get("Origin") || "";
  if (origem && !ORIGENS.includes(origem) && !origem.endsWith(".pages.dev")) {
    return resposta(403, { ok: false, erro: "origem" });
  }
  if (!env.BREVO_API_KEY || !env.BREVO_LIST_ID) {
    return resposta(500, { ok: false, erro: "configuracao" });
  }

  let dados;
  try {
    dados = await request.json();
  } catch (e) {
    return resposta(400, { ok: false, erro: "json" });
  }

  const email = texto(dados.email, 254).toLowerCase();
  if (!EMAIL_OK.test(email)) return resposta(400, { ok: false, erro: "email" });

  const atributos = {
    SABOTADOR: texto(dados.sabotador, 60),
    SEGUNDO_SABOTADOR: texto(dados.segundo, 60),
    HABITO: texto(dados.habito, 120),
    ROTA: texto(dados.rota, 30),
    ORIGEM: texto(dados.origem, 60),
    DATA_DIAGNOSTICO: texto(dados.data, 30),
  };

  const enviar = (comAtributos) =>
    fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email,
        listIds: [Number(env.BREVO_LIST_ID)],
        updateEnabled: true, // quem refaz o diagnóstico tem o resultado atualizado, sem erro de duplicado
        ...(comAtributos ? { attributes: atributos } : {}),
      }),
    });

  let r = await enviar(true);
  // Atributo que não existe na conta: salva só o e-mail na lista, para não perder o contato.
  if (r.status === 400) r = await enviar(false);

  if (r.ok) return resposta(200, { ok: true });
  console.log("Brevo", r.status, await r.text());
  return resposta(502, { ok: false, erro: "brevo" });
}

export function onRequest() {
  return resposta(405, { ok: false, erro: "metodo" });
}
