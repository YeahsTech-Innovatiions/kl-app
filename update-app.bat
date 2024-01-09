@echo off

set repositoryUrl=https://github.com/YeahsTech-Innovatiions/kl-app.git

echo Cloning or pulling changes from %repositoryUrl%...

if not exist ".git" (
    git clone %repositoryUrl% .
) else (
    git pull origin main  REM Change 'main' to your branch if it's different
)

echo Done.
pause