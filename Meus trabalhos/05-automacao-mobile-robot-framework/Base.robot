*** Settings ***
Library     AppiumLibrary
Resource    Global_Variables.robot



*** Keywords ***
Abrir App
    Open Application     http://localhost:4723
    ...                  automationName=UiAutomator2
    ...                  platformName=Android
    ...                  deviceName=moto g(8) play
