*** Settings ***
Library     AppiumLibrary
Resource    Base.robot


*** Keywords ***
Nova tarefa
    Click Element                    ${Abri_To_do}
    Wait Until Element Is Visible    ${Meu_dia}
    Click Element                    ${Meu_dia}
    #Wait Until Element Is Visible    ${Wait add tarefa}
    Click Element                    ${Add tarefa}
    #Wait Until Element Is Visible    ${Wait campo} 
    Input Text                       ${Campo tarefa}    Tarefa automatizada
    Click Element                    ${Data de conclusão}
    Wait Until Element Is Visible    ${Wait escolher data}
    Click Element                    ${Escolher data}
    Click Element                    ${Confirmar data}
    Click Element                    ${Cria tarefa}
    Click Element                    ${Click tela}
    Click Element                    ${Voltar para home}
