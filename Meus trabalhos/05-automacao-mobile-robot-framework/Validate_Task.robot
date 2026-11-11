*** Settings ***
Library     AppiumLibrary
Resource    Base.robot


*** Keywords ***
Validar tarefa
    Wait Until Element Is Visible    ${Meu_dia}
    Click Element                    ${Meu_dia}
    Click Element                    ${Tarefa criada}
    Wait Until Element Is Visible    ${Tarefa do dia}