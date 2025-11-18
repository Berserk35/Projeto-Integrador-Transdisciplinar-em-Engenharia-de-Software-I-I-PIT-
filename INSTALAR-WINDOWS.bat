@echo off
chcp 65001 > nul
echo ========================================
echo   BERSERK ARMOR - INSTALADOR
echo   Desenvolvido por Sivaldo Silva
echo ========================================
echo.
echo Instalando dependências do backend...
echo.
cd backend
call npm install
if errorlevel 1 (
    echo.
    echo ERRO ao instalar dependências!
    echo Verifique se o Node.js está instalado.
    echo Baixe em: https://nodejs.org
    pause
    exit /b 1
)
echo.
echo ========================================
echo   INSTALAÇÃO CONCLUÍDA COM SUCESSO!
echo ========================================
echo.
echo Próximos passos:
echo 1. Feche esta janela
echo 2. Duplo clique em INICIAR.bat
echo.
pause
