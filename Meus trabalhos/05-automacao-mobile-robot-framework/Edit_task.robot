*** Settings ***
Library     AppiumLibrary
Resource    Base.robot

*** Keywords ***
Edição
    Click Element    ${Clicar em add etapa}
    Click Element    ${Add etapa}
    Input Text       ${Add etapa}    Edição concluída
    #Click Element    ${Lembrar-me}
    #Click Element    ${Ainda hoje}
    Click Element    ${Abrir campo texto tarefa}
    Wait Until Element Is Visible    ${Campo texto tarefa}
    Input Text       ${Campo texto tarefa}    Finalizando edição
    Click Element    ${Btn voltar campo texto tarefa}
    Click Element    ${Btn voltar tarefa}