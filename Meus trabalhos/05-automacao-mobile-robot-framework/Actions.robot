*** Settings ***
Resource    Base.robot
Resource    NewTask_Keywords.robot
Resource    Validate_Task.robot
Resource    Edit_task.robot
Resource    Delete_Task.robot
Suite Teardown    Close Application

*** Test Cases ***
Abrir App
    Abrir App
    Nova tarefa
    Validar tarefa
    Edição
    Deletar tarefa