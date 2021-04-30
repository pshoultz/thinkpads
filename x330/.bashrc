export EDITOR=vim
export VISUAL=vim
export GOPATH=$HOME/go

PATH=$PATH:$GOAPTH/bin

source /home/pcs/.base16-shell/scripts/base16-google-dark.sh

alias bye="sudo poweroff"
alias run="startx"
alias ls='ls --color=auto'

setxkbmap -option caps:escape
xrandr --dpi 192
xcape -e Control_L=Escape
