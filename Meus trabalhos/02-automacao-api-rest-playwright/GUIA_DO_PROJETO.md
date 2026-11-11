# Guia do projeto: como explicar esta entrega

Material de apoio para apresentar o projeto: o que foi feito, como foi feito e por quê.

---

## 1. O que foi feito, em uma frase

Uma suíte de **55 testes automatizados de API** com Playwright e TypeScript cobre o CRUD de usuários e a autenticação JWT do
ServeRest. Um teste à parte cobre o limite de taxa. A suíte roda no GitHub Actions a cada push ou PR e publica os relatórios
HTML e JUnit como artefatos. A documentação liga cada requisito da especificação a um teste.

## 2. Como trabalhei (ordem das etapas)

1. **Requisitos primeiro:** extraí da especificação 16 requisitos numerados (REQ-01 a REQ-16) antes de escrever qualquer código.
2. **Entender a API real:** li o Swagger e fiz chamadas exploratórias para confirmar cada mensagem e código de resposta.
   Nenhuma asserção foi escrita "de cabeça".
3. **Divergências tratadas como achados:** comparei a especificação com a API. Onde a API não segue o requisito (JWT, rate limit), o
   requisito foi testado mesmo assim e a divergência foi documentada. Não escondi nada nem inventei comportamento.
4. **Plano aprovado antes da implementação**, depois execução repetida (3 rodadas seguidas, todas verdes) para garantir estabilidade.

## 3. Estrutura de pastas e o porquê de cada uma

| Pasta/arquivo | Responsabilidade | Por que existe |
|---|---|---|
| `src/clientes/` | Um cliente por recurso (`UsuariosCliente`, `AutenticacaoCliente`...) | O teste descreve o comportamento (`usuarios.cadastrar(dados)`) e não monta URL nem header. Se uma rota mudar, muda em um lugar só |
| `src/contratos/` | Schemas Zod e a função `validarResposta()` | Toda resposta é validada contra o contrato do Swagger. Campo a mais, a menos ou com tipo errado quebra o teste |
| `src/dados/fabricas.ts` | Geração de usuários e produtos com Faker + UUID | Dados únicos a cada execução: sem colisão em paralelo e sem senha fixa no código |
| `src/fixtures/index.ts` | Fixtures do Playwright | Entregam os clientes prontos, as pré-condições (`criarUsuario`, `obterToken`) e a **limpeza automática** |
| `src/config/ambiente.ts` | Variáveis de ambiente | Um único ponto para trocar de ambiente (`BASE_URL`) |
| `tests/` | Specs organizadas por endpoint | Fácil achar o teste de cada operação; o nome do arquivo diz o que ele testa |
| `docs/matriz-rastreabilidade.md` | Requisito → teste → status, mais os achados | Prova que nada da especificação ficou de fora |
| `playwright.limite-taxa.config.ts` | Configuração isolada do teste de rate limit | Esse teste dispara mais de 100 requisições e não deve rodar a cada push |

## 4. Decisões técnicas (e a justificativa)

| Decisão | Por quê |
|---|---|
| **TypeScript** | Tipagem dos payloads e das respostas pega erro antes de executar. É o padrão do Playwright |
| **Recursos nativos do Playwright** (`request`, fixtures, `expect`) | "Não reinventar a roda": sem axios nem frameworks extras. O relatório HTML já mostra cada requisição |
| **Zod para contrato** | Uma linha de schema substitui dezenas de `expect` campo a campo. A mensagem de erro aponta exatamente o campo fora do contrato |
| **Testes independentes + paralelismo total** | Cada teste cria e apaga os próprios dados. Nenhum depende de outro, a ordem não importa e a suíte roda em cerca de 13 s |
| **Limpeza no cliente** | Todo 201 recebido (POST ou PUT) registra a exclusão do usuário criado. Se um teste negativo criar um usuário por bug, ele também é limpo. Verifiquei: zero usuários remanescentes após as execuções |
| **E-mails em `example.com`** | Domínio reservado (RFC 2606). O ServeRest rejeita TLDs inexistentes, como `.test`; descobri isso na primeira execução |
| **Sem `waitForTimeout`** | Testes de API não precisam de espera fixa: cada chamada é aguardada com `await` |
| **Retry só no CI (1x)** | A API é pública e compartilhada: um retry absorve instabilidade de rede sem mascarar falhas locais |

## 5. Estratégia de cenários (visão de QA Lead)

- **Pirâmide por endpoint:** para cada operação, primeiro o caminho feliz (`@smoke`), depois as regras de negócio
  (e-mail duplicado, carrinho vinculado) e por fim validação de entrada e bordas (campo ausente, vazio, tipo errado, ID com 15 e 17 caracteres).
- **Técnicas usadas:** partição de equivalência (perfil `true`/`false`), valor-limite (ID com 15, 16 e 17 caracteres) e
  testes parametrizados (um teste por campo obrigatório, sem duplicar código).
- **Verificar o efeito, não só a resposta:** depois de criar, alterar ou excluir, o teste consulta a API de novo para confirmar
  que o dado mudou de fato. Exemplo: após trocar a senha, o login com a senha antiga falha.
- **Priorização por tags:** `@smoke` roda os caminhos críticos em segundos; `@regressao` roda tudo; `@REQ-xx` filtra por requisito.
- **Rastreabilidade:** o ID do caso (`CT-CAD-03`) aparece no nome do teste, no README, na matriz e no relatório HTML.

## 6. Pontos para destacar na apresentação

1. **Divergências viraram achados, não gambiarra.** A especificação exige JWT e rate limit; o ServeRest não aplica nenhum dos dois em `/usuarios`.
   O teste de rate limit foi escrito conforme o requisito e falha, o que é a evidência correta. O JWT foi validado em uma rota que de fato o exige.
2. **Achados de segurança:** o JWT carrega a senha em texto puro, e o GET de usuários expõe senhas (ver a matriz, A-03 e A-04).
3. **Cobertura objetiva:** 100% dos endpoints e de todos os códigos de resposta documentados, medida contra o contrato.
4. **Pronto para CI:** os relatórios são publicados como artefato mesmo quando a suíte falha, que é justamente quando eles mais importam.

## 7. Como executar e ver o relatório

```bash
npm ci                    # instala dependências
npm test                  # suíte completa
npm run test:smoke        # só os caminhos críticos
npm run test:limite-taxa  # teste de rate limit (REQ-07)
npm run report            # abre o relatório HTML
```

No GitHub: aba **Actions** → execução mais recente → seção **Artifacts** → `relatorio-html`.
Para rodar o rate limit no CI: **Actions → Testes de API → Run workflow** e marque *executar_limite_taxa*.

## 8. Perguntas que podem surgir

- **"Por que o teste de rate limit falha?"** Porque o ServeRest público não implementa o limite. Mudar a asserção para passar
  esconderia um descumprimento de requisito. Ele roda à parte para não bloquear a pipeline com algo que não depende do time de QA.
- **"Por que PUT com ID inexistente retorna 201 no teste?"** É o comportamento documentado no Swagger do ServeRest (upsert).
  O teste valida o contrato; o risco de PUT ignorar um ID em formato inválido está nos achados (A-05).
- **"Por que o contrato aceita qualquer string no e-mail?"** O Swagger define `email` como string. A regra de formato é testada
  onde ela vale (CT-CAD-07, no cadastro). A base pública contém e-mails com emoji aceitos pela própria API.
- **"Como escalar o projeto?"** Novo recurso: um cliente em `src/clientes`, um schema em `src/contratos` e uma spec em `tests/`.
  A fixture de limpeza já funciona para qualquer recurso via `aoFinalizar`.
