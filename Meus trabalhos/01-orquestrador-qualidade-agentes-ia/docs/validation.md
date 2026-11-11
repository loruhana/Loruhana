# Validação e acompanhamento — 04/11/2026

## Identidade e publicação

Repositório público: `loruhana/orangehrm-quality-orchestrator`. Histórico independente, com autor e committer `loruhana` e endereço noreply associado ao ID GitHub 118454846. O repositório original não foi modificado. A API e a interface do GitHub confirmaram `loruhana` como única contributor.

## Testes executados

- **14 testes unitários aprovados:** escopo, autorização, encaminhamento de issues novas, ausência de achados, bloqueios, relatórios, deduplicação e revisão por SHA.
- **Controle de navegador aprovado:** o teste canônico falha no fixture defeituoso e passa no corrigido.
- **Orquestrador com Codex:** interpretou “módulo de funcionários PIM”, selecionou login válido e navegação PIM e registrou Automatizador/Revisor como ignorados quando não houve achados.
- **Quatro agentes com Codex local:** pré-condições, planejamento, exploração, geração de teste e revisão executados com a sessão autenticada. A análise de contraste foi registrada como inconclusiva.
- **Suíte completa no GitHub Actions:** 12 casos executados; 9 passaram, 2 confirmaram violações de acessibilidade, 1 terminou inconclusivo por resposta incompleta do axe-core. Nenhum caso foi ignorado. [Execução e artifacts](https://github.com/loruhana/orangehrm-quality-orchestrator/actions/runs/41741524828).
- **Sincronização de validação do login:** corrigida espera pela renderização; três repetições locais passaram e a execução Linux confirmou a correção.
- **YAML e skill:** sintaxe dos quatro workflows, referências entre jobs e estrutura da skill validadas.

## Evidências reproduzíveis

- [Issue #1 — HTML sem declaração de idioma](https://github.com/loruhana/orangehrm-quality-orchestrator/issues/1).
- [Issue #2 — links sociais sem nome acessível](https://github.com/loruhana/orangehrm-quality-orchestrator/issues/2).
- [PRs com testes e pareceres](https://github.com/loruhana/orangehrm-quality-orchestrator/pulls).

Uma execução da suíte completa aparece vermelha enquanto os defeitos ou resultados inconclusivos persistirem. Isso não é ocultado pelo projeto. O CI interno valida a infraestrutura separadamente. Os relatórios são publicados mesmo quando testes falham.

## Agendamento e credenciais

O workflow `mapped-tests.yml` está no branch padrão com dois schedules diários: `30 11 * * *` e `0 19 * * *`, equivalentes a **08:30 e 16:00 BRT**. Todos os casos do catálogo são coletados dinamicamente.

O workflow manual separa análise, publicação e relatório em jobs com Artifacts e permissões específicas. A permissão do GitHub para criar PRs via Actions foi habilitada com autorização explícita; a permissão padrão continua `read`. Não existe merge ou aprovação formal automática no código.

O modo `rules` valida o fluxo sem modelo. Para `provider=codex` em runners hospedados, configure `OPENAI_API_KEY`; a sessão local do ChatGPT não foi exportada. A execução agendada dos testes não depende dessa chave.

## Correções verificadas em 04/11/2026

- O job `publicar-revisoes` falhava com HTTP 403 ao comentar na PR #4. Sua permissão `pull-requests` passou de `read` para `write`, mantendo a escrita restrita ao job publicador.
- Todos os jobs da auditoria usam agora o mesmo `github.sha`. Um push durante a auditoria não troca o código de uma etapa posterior.
- Os 14 testes unitários passaram novamente. [CI da correção aprovado](https://github.com/loruhana/orangehrm-quality-orchestrator/actions/runs/41853757775).
- O CI da PR #4 aguardava autorização por ter sido criado pelo bot. Após conferir o diff de um único teste canônico, a execução foi liberada e [passou](https://github.com/loruhana/orangehrm-quality-orchestrator/actions/runs/41048330645). Novas PRs do bot podem exigir a mesma ação de um mantenedor; não há aprovação automática nem merge.
- A última suíte agendada inspecionada executou os 12 casos: 9 passaram, `html-has-lang` e `link-name` falharam por violações observadas e `color-contrast` foi inconclusivo. Os artifacts e o resumo foram publicados.
- Os dois cron estão corretos para 08:30 e 16:00 BRT. O histórico de 30/10 a 03/11 contém disparos `schedule`, mas com atrasos relevantes em relação ao horário configurado; o GitHub Actions não oferece pontualidade garantida.
- A consulta dos nomes de secrets do repositório não encontrou `OPENAI_API_KEY`. A validação hospedada usa explicitamente `provider=rules`, sem IA; o modo Codex hospedado permanece dependente dessa configuração.
## Resultado do pipeline corrigido

[Execução 41853786746](https://github.com/loruhana/orangehrm-quality-orchestrator/actions/runs/41853786746): os oito jobs concluíram com sucesso, incluindo publicação dos pareceres e relatório final. Provider `rules`, escopo `Login`: 7 casos observados, 2 achados confirmados, 2 testes gerados e 2 revisões independentes. As duas issues e duas PRs existentes foram reutilizadas, sem duplicações. Cada PR contém um parecer associado ao SHA.

O relatório de auditoria tem status `partial` porque a análise de contraste continua inconclusiva. Isso é distinto do sucesso operacional do workflow. A execução comprova o encadeamento determinístico; não comprova IA hospedada sem `OPENAI_API_KEY`.
