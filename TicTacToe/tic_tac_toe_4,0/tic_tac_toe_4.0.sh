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

save_game() {
    echo "${game_board[@]}" > game_state.txt
}

load_game() {
    if [ -f game_state.txt ]; then
        read -r -a game_board < game_state.txt
    else
        echo "Nie znaleziono zapisanej gry."
	echo "Za 5 sekund rozpoczniesz nową grę!"
	
	for ((i=5; i>=1; i--))
	do
	    echo "$i..."
	    sleep 1
	    done
    fi
}

player_move() {
    local player=$1
    echo "Gracz $player, wybierz pole (1-9) lub 'z' aby zapisać grę: "
    read choice
    if [[ $choice == "z" ]]; then
        save_game
        echo "Gra została zapisana."
        echo "Gracz $player, wybierz pole (1-9) lub 'z' aby zapisać grę: "
        read choice
	if [[ ${game_board[$((choice-1))]} == [0-9] && $choice -ge 1 && $choice -le 9 ]]; then
        game_board[$((choice-1))]="$player"
    else
        echo "Błędny ruch! Wybierz wolne pole (1-9)."
        player_move $player
    fi
    elif [[ ${game_board[$((choice-1))]} == [0-9] && $choice -ge 1 && $choice -le 9 ]]; then
        game_board[$((choice-1))]="$player"
    else
        echo "Błędny ruch! Wybierz wolne pole (1-9)."
        player_move $player
    fi
}

main() {
    while true; do
        local player="X"
        echo "Czy chcesz wczytać poprzednią grę? (t/n)"
        read choice
        if [ "$choice" == "t" ]; then
            load_game
        fi
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
        if [ "$choice" != "t" ]; then
            break
        fi
        game_board=(1 2 3 4 5 6 7 8 9)
    done
}

main
