set encoding=utf-8
set nocompatible
set noswapfile
filetype off
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#rc()

Plugin 'VundleVim/Vundle.vim'
Plugin 'chriskempson/base16-vim'
Plugin 'itchyny/lightline.vim'
Plugin 'itchyny/vim-gitbranch'
Plugin 'ryanoasis/vim-devicons'
Plugin 'ctrlpvim/ctrlp.vim'
Plugin 'tpope/vim-fugitive'
Plugin 'francoiscabrol/ranger.vim'

filetype plugin indent on
set hidden
set t_Co=256
syntax enable
set background=dark
let base16colorspace=256
colorscheme base16-google-dark
set tabstop=2
set number

"buffers for tabbing through pages
nnoremap <c-b> :buffer <CR>
nnoremap <Tab> :bnext <CR>
nnoremap <S-Tab> :bprevious <CR>

let g:lightline = {
      \ 'colorscheme': 'wombat',
      \ 'active': {
      \   'left': [ [ 'mode', 'paste' ],
      \             [ 'gitbranch', 'readonly', 'filename', 'modified' ] ]
      \ },
      \ 'component_function': {
      \   'gitbranch': 'FugitiveHead'
      \ },
      \ }
