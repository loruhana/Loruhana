*** Settings ***
Library     AppiumLibrary
Resource    Base.robot

*** Keywords ***
Deletar tarefa 
    Wait Until Element Is Visible    ${Tarefa criada}
   Click Element    ${Tarefa criada}
   Click Element    ${Btn deletar tarefa}
   Wait Until Element Is Visible    ${Tem CTZ exclusão}
   Click Element    ${Tem CTZ exclusão}