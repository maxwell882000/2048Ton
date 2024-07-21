import React, {useCallback, useEffect, useState} from 'react';

const Game2048 = () => {
    const [board, setBoard] = useState([]);
    const [score, setScore] = useState(0);
    const rows = 4;
    const columns = 4;

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const setGame = useCallback(() => {
        const newBoard = Array(rows).fill().map(() => Array(columns).fill({value: 0, isNew: false}));
        setBoard(newBoard);
        setTwo(newBoard);
        setTwo(newBoard);
    }, []);

    useEffect(() => {
        setGame();
    }, [setGame]);

    const getTilePosition = (row, col) => {
        return {
            left: `${col * 75}px`,
            top: `${row * 75}px`
        };
    };

    const updateTile = (cell) => {
        if (cell.value === 0) return {className: 'tile', innerText: ''};
        return {
            className: `tile x${cell.value <= 4096 ? cell.value : 8192}${cell.isNew ? ' tile-new' : ''}`,
            innerText: cell.value.toString()
        };
    };


    const handleSwipe = useCallback(() => {
        if (!touchStart || !touchEnd) return;
        const distanceX = touchStart.x - touchEnd.x;
        const distanceY = touchStart.y - touchEnd.y;
        const isHorizontal = Math.abs(distanceX) > Math.abs(distanceY);

        let newBoard;
        if (isHorizontal) {
            if (distanceX > 20) {
                newBoard = slideLeft(board);
            } else if (distanceX < -20) {
                newBoard = slideRight(board);
            }
        } else {
            if (distanceY > 20) {
                newBoard = slideUp(board);
            } else if (distanceY < -20) {
                newBoard = slideDown(board);
            }
        }

        if (newBoard) {
            setTwo(newBoard);
        }
    }, [board, touchStart, touchEnd]);

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    };

    const onTouchMove = (e) => {
        setTouchEnd({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    };

    const onTouchEnd = () => {
        handleSwipe();
        setTouchStart(null);
        setTouchEnd(null);
    };

    const filterZero = (row) => row.filter(num => num !== 0);

    const slide = (row) => {
        let newRow = row.filter(cell => cell.value !== 0);
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i].value === newRow[i + 1].value) {
                newRow[i] = {value: newRow[i].value * 2, isNew: false};
                newRow[i + 1] = {value: 0, isNew: false};
                setScore(prevScore => prevScore + newRow[i].value);
            }
        }
        newRow = newRow.filter(cell => cell.value !== 0);
        while (newRow.length < columns) {
            newRow.push({value: 0, isNew: false});
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
        } while (currentBoard[r][c].value !== 0);
        const newBoard = currentBoard.map(row => row.map(cell => ({...cell})));
        newBoard[r][c] = {value: 2, isNew: true};
        setBoard(newBoard);
        return newBoard;
    };

    const hasEmptyTile = (currentBoard) => {
        return currentBoard.some(row => row.some(cell => cell.value === 0));
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
        <div style={{marginTop: 20}}>
            <div>Score: {score}</div>
            <div id="board"
                 onTouchStart={onTouchStart}
                 onTouchMove={onTouchMove}
                 onTouchEnd={onTouchEnd}>
                {board.map((row, r) => (
                    row.map((cell, c) => {
                        const {className, innerText} = updateTile(cell);
                        const position = getTilePosition(r, c);
                        return (
                            <div
                                key={`${r}-${c}`}
                                className={className}
                                style={position}
                            >
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