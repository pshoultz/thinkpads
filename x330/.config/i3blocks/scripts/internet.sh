#!/bin/bash 
 
WIFI=$(ip addr | grep "3: " | awk '{print $2}') 
WIFI_STATUS=$(ip addr | grep "3: " | awk '{print $9}') 
ETHERNET=$(ip addr | grep "2: " | awk '{print $2}') 
ETHERNET_STATUS=$(ip addr | grep "2: " | awk '{print $9}') 

NAME=""
STATUS=""
COLOR="#FF0000" 

if [ $WIFI_STATUS == "DOWN" ]; then

	if [ $ETHERNET_STATUS == "DOWN" ]; then
		NAME="no connections"
	fi

fi

if [ $WIFI_STATUS == "UP" ]; then
	NAME=$WIFI
	COLOR="#00FF00" 
	ICON="🇺🇵" 
else
	if [ $ETHERNET_STATUS == "UP" ]; then
		$NAME=$ETHERNET
		COLOR="#00FF00" 
		ICON="🇺🇵" 
	fi
fi

#each index here represents some part of the i3blocks config
echo "$NAME$ICON" 
echo "$NAME$ICON" 
echo $COLOR #color needs to be 3rd line here

