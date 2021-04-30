#!/bin/bash 
 
TEMP=$(sensors | grep "Core 1:" | awk '{print substr($3,2) * 1}')
COLOR="#FFFFFF" 

if [[ "${TEMP}" -gt 40 ]]; then 
 COLOR="#008000	" 
fi 

if [[ "${TEMP}" -gt 70 ]]; then 
 COLOR="#FFFF00" 
fi 
 
if [[ "${TEMP}" -gt 90 ]]; then 
 COLOR="#FF0000" 
fi 
 
#each index here represents some part of the i3blocks config
echo $TEMP
echo $TEMP
echo $COLOR #color needs to be 3rd line here
