#!/bin/bash

declare -a game_board
game_board=(1 2 3 4 5 6 7 8 9)

draw_game_board() {
    clear
    echo " ${game_board[0]} | ${game_board[1]} | ${game_board[2]} "
    echo "---+---+---"
    echo " ${game_board[3]} | ${game_board[4]} | ${game_board[5]} "
    echo "---+---+---"
    echo " ${game_board[6]} | ${game_board[7]} | ${game_board[8]} "
}

check_win() {
    local symbol=$1

    for i in {0..2}; do
        if [[ ${game_board[$i]} == $symbol && ${game_board[$((i+3))]} == $symbol && ${game_board[$((i+6))]} == $symbol ]] || \
           [[ ${game_board[$((i*3))]} == $symbol && ${game_board[$((i*3+1))]} == $symbol && ${game_board[$((i*3+2))]} == $symbol ]]; then
	    draw_game_board
            echo "Gratulacje! Gracz $symbol wygrał!"
            return 0
        fi
    done

    if [[ ${game_board[0]} == $symbol && ${game_board[4]} == $symbol && ${game_board[8]} == $symbol ]] || \
       [[ ${game_board[2]} == $symbol && ${game_board[4]} == $symbol && ${game_board[6]} == $symbol ]]; then
	draw_game_board
        echo "Gratulacje! Gracz $symbol wygrał!"
        return 0
    fi
    return 1
}

check_full_game_board() {
    for index in "${!game_board[@]}"; do
        if [[ ${game_board[$index]} == [0-9] ]]; then
            return 1
        fi
    done
    echo "Remis!"
    if check_win "X" || check_win "O"; then
        return 0
    fi
}

player_move() {
    local player=$1
    echo "Gracz $player, wybierz pole (1-9): "
    read choice
    if [[ ${game_board[$((choice-1))]} == [0-9] && $choice -ge 1 && $choice -le 9 ]]; then
        game_board[$((choice-1))]="$player"
    else
        echo "Błędny ruch! Wybierz wolne pole (1-9)."
        player_move $player
    fi
}

main() {
    local player="X"
    while true; do
        draw_game_board
        if [ "$player" == "X" ]; then
            player_move $player
            if check_win "$player"; then
                break
            fi
            player="O"
        else
            player_move $player
            if check_win "$player"; then
                break
            fi
            player="X"
        fi
        draw_game_board
        if check_full_game_board; then
            break
        fi
    done
    echo "Czy chcesz zagrać ponownie? (t/n)"
    read choice
    if [ "$choice" == "t" ]; then
        game_board=(1 2 3 4 5 6 7 8 9)
        main
    fi
}

main
