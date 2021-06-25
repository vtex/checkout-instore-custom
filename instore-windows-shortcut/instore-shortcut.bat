@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

SET AccountName=vtexinstoredev

SET LinkName=inStore
SET Esc_LinkDest=%%HOMEDRIVE%%%%HOMEPATH%%\Desktop\!LinkName!.lnk
SET Esc_LinkTarget="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
SET Esc_LinkArguments="--user-data-dir=""c:\instore-chrome"" --app=""https://!AccountName!.myvtex.com/checkout/instore""" 
SET cSctVBS=CreateShortcut.vbs
SET LOG=".\%~N0_runtime.log"
((
  echo Set oWS = WScript.CreateObject^("WScript.Shell"^) 
  echo sLinkFile = oWS.ExpandEnvironmentStrings^("!Esc_LinkDest!"^)
  echo Set oLink = oWS.CreateShortcut^(sLinkFile^) 
  echo oLink.TargetPath = oWS.ExpandEnvironmentStrings^(!Esc_LinkTarget!^)
  echo oLink.Arguments = oWS.ExpandEnvironmentStrings^(!Esc_LinkArguments!^)
  echo oLink.Save
)1>!cSctVBS!
cscript //nologo .\!cSctVBS!
DEL !cSctVBS! /f /q
)1>>!LOG! 2>>&1
