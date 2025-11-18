@echo off
chcp 65001 > nul
echo ========================================
echo   BERSERK ARMOR - INICIANDO
echo   Desenvolvido por Sivaldo Silva
echo ========================================
echo.
echo Backend iniciando na porta 3000...
echo.
cd backend
start "Berserk Armor Backend" cmd /k "node server.js"
echo.
echo ========================================
echo   BACKEND RODANDO!
echo ========================================
echo.
echo Agora abra o arquivo: frontend/index.html
echo.
echo Para parar o servidor:
echo - Feche a janela "Berserk Armor Backend"
echo.
pause
