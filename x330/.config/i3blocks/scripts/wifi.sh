#!/bin/bash 
 
NAME=$(ip addr | grep "3: " | awk '{print $2}') 
STATUS=$(ip addr | grep "3: " | awk '{print $9}') 
COLOR="#FF0000" 
ICON=""
 
if [ $STATUS == "DOWN" ]; then 
  COLOR="#FF0000" 
	ICON="π©π³"	
fi 
 
if [ $STATUS == "UP" ]; then 
  COLOR="#00FF00" 
	ICON="πΊπ΅"	
fi 
 
#each index here represents some part of the i3blocks config
echo "$NAME $ICON" 
echo "$NAME $ICON" 
echo $COLOR #color needs to be 3rd line here
