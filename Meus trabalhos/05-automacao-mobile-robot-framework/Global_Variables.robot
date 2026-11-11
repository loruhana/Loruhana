*** Settings ***
Resource    Base.robot

*** Variables ***
${Abri_To_do}    android=new UiSelector().description("To Do")     #abrir app
${Meu_dia}     xpath=(//android.view.View[@resource-id="com.microsoft.todos:id/name_background"])[1]    #abrir aba Meu Dia
${Wait add tarefa}         xpath=//android.widget.ImageButton[@content-desc="Adicionar uma tarefa"]    timeout=3
${Add tarefa}     accessibility_id=Adicionar uma tarefa    #Add uma tarefa
${Wait campo}         xpath=//android.widget.EditText[@resource-id="com.microsoft.todos:id/create_task_edit_text"]    timeout=3
${Campo tarefa}          xpath=//android.widget.EditText[@resource-id="com.microsoft.todos:id/create_task_edit_text"]       #digitar tarefa  
${Data de conclusão}     xpath=//android.widget.TextView[@resource-id="com.microsoft.todos:id/chip_title_view" and @text="Definir data de conclusão"]    #Data de conclusão
${Wait escolher data}         xpath=//android.widget.TextView[@resource-id="com.microsoft.todos:id/title" and @text="Escolher uma data"]   
${Escolher data}     xpath=//android.widget.TextView[@resource-id="com.microsoft.todos:id/title" and @text="Escolher uma data"]    #esclher data
${Confirmar data}     xpath=//android.widget.Button[@resource-id="android:id/button1"]    #confirmar data
${Cria tarefa}     xpath=//android.widget.ImageView[@content-desc="Adicionar uma tarefa"]    #criar tarefa
${Click tela}     xpath=//android.widget.ImageButton[@content-desc="Voltar"]    #click na tela
${Voltar para home}     xpath=//android.widget.ImageButton[@content-desc="Voltar"]     #voltar para home
${Tarefa criada}    xpath=//android.widget.TextView[@resource-id="com.microsoft.todos:id/task_title"]       #Tarefa criada
${Tarefa do dia}    xpath=//android.widget.TextView[@resource-id="com.microsoft.todos:id/task_title"]       #Tarefa do dia
${Clicar em add etapa}    xpath=//android.widget.ImageView[@resource-id="com.microsoft.todos:id/add_step_plus_ic"]
${Add etapa}    xpath=//android.widget.EditText[@resource-id="com.microsoft.todos:id/add_step_title_edit"]       #Adicionar etapa
${Lembrar-me}    xpath=//android.widget.TextView[@resource-id="com.microsoft.todos:id/reminder_textview"]    #Lembrar-me
${Ainda hoje}    xpath=(//android.widget.LinearLayout[@resource-id="com.microsoft.todos:id/content"])[1]    #Ainda hoje
${Abrir campo texto tarefa}    xpath=//android.widget.TextView[@resource-id="converted-body"]    #Abrir campo texto tarefa
${Campo texto tarefa}    xpath=//android.widget.EditText[@resource-id="ms-outlook-mobile-rooster-writer"]    #Campo texto tarefa
${Btn voltar campo texto tarefa}    xpath=//android.widget.ImageButton[@content-desc="Fechar e salvar"]
${Btn voltar tarefa}    xpath=//android.widget.ImageButton[@content-desc="Ignorar modo de exibição de detalhes"]
${Btn Deletar tarefa}    xpath=//android.widget.ImageView[@content-desc="Excluir tarefa"]
${Tem CTZ exclusão}    xpath=//android.widget.Button[@resource-id="android:id/button1"]