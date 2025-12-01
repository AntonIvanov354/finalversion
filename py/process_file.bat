@echo off
chcp 65001 >nul
echo 📁 Обработчик текстовых файлов
set /p filename="Введите путь к TXT-файлу: "

if not exist "%filename%" (
    echo ❌ Файл не найден!
    pause
    exit /b 1
)

echo 🔧 Запуск обработки...
python safe_ai.py "%filename%"

echo 🧹 Очистка...
timeout /t 1 /nobreak >nul
taskkill /f /im python.exe >nul 2>&1

echo ✅ Готово!
pause