#!/bin/bash

DEFAULT=$(pactl info | awk '/Default Sink/{print $3}')
INDEX=$(pactl list sinks short | awk "/$DEFAULT/"'{print $1}')

# Get Volume
VOLUME=$(pactl list sinks | grep "Sink #$INDEX\|^[[:space:]]Volume:" | grep -A 1 "Sink #$INDEX" | grep "^[[:space:]]Volume" | awk '{print $5}');

# Get Mute Status
MUTE=$(pactl list sinks | grep "Sink #$INDEX\|Mute" | grep -A 1 "Sink #$INDEX" | grep Mute | awk '/Mute/{print $2}')

ICON=🔊
COLOR="#E0E0E0"

if [ $MUTE == "yes" ]; then
	ICON=🔇
	COLOR="#E0E000"
fi

echo "$ICON  $VOLUME"
echo "$ICON  $VOLUME"
echo $COLOR

if [ "$BLOCK_BUTTON" -eq 1 ]; then
	if [ $MUTE == "yes" ]; then
		pactl set-sink-mute $INDEX 0
	else
		pactl set-sink-mute $INDEX 1
	fi
elif [ "$BLOCK_BUTTON" -eq 2 ]; then
	pavucontrol
elif [ "$BLOCK_BUTTON" -eq 4 ]; then
	pactl set-sink-volume $INDEX +5%
elif [ "$BLOCK_BUTTON" -eq 5 ]; then
	pactl set-sink-volume $INDEX -5%
elif [ "$BLOCK_BUTTON" -eq 3 ]; then
	audio change-sink-gui
fi
