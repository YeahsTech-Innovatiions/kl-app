@echo off

set repositoryUrl=https://github.com/YeahsTech-Innovatiions/kl-app.git

echo Cloning or pulling changes from %repositoryUrl%...

git pull
cd /d ".\dev"
start npm install

echo Done.
pause