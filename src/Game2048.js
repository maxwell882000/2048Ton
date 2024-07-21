import React, {useCallback, useEffect, useState} from 'react';

const Game2048 = () => {
    const [board, setBoard] = useState([]);
    const [score, setScore] = useState(0);
    const rows = 4;
    const columns = 4;

    const setGame = useCallback(() => {
        const newBoard = Array(rows).fill().map(() => Array(columns).fill(0));
        setBoard(newBoard);
        setTwo(newBoard);
        setTwo(newBoard);
    }, []);

    useEffect(() => {
        setGame();
    }, [setGame]);

    const updateTile = (num) => {
        if (num === 0) return {className: 'tile', innerText: ''};
        return {
            className: `tile x${num <= 4096 ? num : 8192}`,
            innerText: num.toString()
        };
    };

    const filterZero = (row) => row.filter(num => num !== 0);

    const slide = (row) => {
        let newRow = filterZero(row);
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                newRow[i + 1] = 0;
                setScore(prevScore => prevScore + newRow[i]);
            }
        }
        newRow = filterZero(newRow);
        while (newRow.length < columns) {
            newRow.push(0);
        }
        return newRow;
    };

    const slideLeft = (currentBoard) => {
        const newBoard = currentBoard.map(row => slide(row));
        setBoard(newBoard);
        return newBoard;
    };

    const slideRight = (currentBoard) => {
        const newBoard = currentBoard.map(row => slide([...row].reverse()).reverse());
        setBoard(newBoard);
        return newBoard;
    };

    const slideUp = (currentBoard) => {
        const newBoard = Array(rows).fill().map(() => Array(columns).fill(0));
        for (let c = 0; c < columns; c++) {
            const column = currentBoard.map(row => row[c]);
            const newColumn = slide(column);
            for (let r = 0; r < rows; r++) {
                newBoard[r][c] = newColumn[r];
            }
        }
        setBoard(newBoard);
        return newBoard;
    };

    const slideDown = (currentBoard) => {
        const newBoard = Array(rows).fill().map(() => Array(columns).fill(0));
        for (let c = 0; c < columns; c++) {
            const column = currentBoard.map(row => row[c]).reverse();
            const newColumn = slide(column).reverse();
            for (let r = 0; r < rows; r++) {
                newBoard[r][c] = newColumn[r];
            }
        }
        setBoard(newBoard);
        return newBoard;
    };

    const setTwo = (currentBoard) => {
        if (!hasEmptyTile(currentBoard)) return currentBoard;
        let r, c;
        do {
            r = Math.floor(Math.random() * rows);
            c = Math.floor(Math.random() * columns);
        } while (currentBoard[r][c] !== 0);
        const newBoard = currentBoard.map(row => [...row]);
        newBoard[r][c] = 2;
        setBoard(newBoard);
        return newBoard;
    };

    const hasEmptyTile = (currentBoard) => {
        return currentBoard.some(row => row.some(cell => cell === 0));
    };

    const handleKeyDown = useCallback((event) => {
        let newBoard;
        switch (event.code) {
            case 'ArrowLeft':
                newBoard = slideLeft(board);
                break;
            case 'ArrowRight':
                newBoard = slideRight(board);
                break;
            case 'ArrowUp':
                newBoard = slideUp(board);
                break;
            case 'ArrowDown':
                newBoard = slideDown(board);
                break;
            default:
                return;
        }
        setTwo(newBoard);
    }, [board]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);


    return (
        <div>
            <div>Score: {score}</div>
            <div id="board">
                {board.map((row, r) => (
                    row.map((cell, c) => {
                        const {className, innerText} = updateTile(cell);
                        return (
                            <div key={`${r}-${c}`} className={className}>
                                {innerText}
                            </div>
                        );
                    })
                ))}
            </div>
        </div>
    );
};

export default Game2048;