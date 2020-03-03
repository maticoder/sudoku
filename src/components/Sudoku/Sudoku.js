import React, { Component } from 'react';
import { getGrid, checkIfGridIsCompleted, validGrid } from '../../utils';

import Loader from '../Loader/Loader';

import './Sudoku.css';

class Sudoku extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matrix: Array.from(Array(9), _ => Array(9).fill(' ')),
            value: null,
            buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'd', 'h', 'r'],
            board: [
                [0, 0, 0, 0, 0, 0, 6, 8, 0],
                [0, 0, 0, 0, 7, 3, 0, 0, 9],
                [3, 0, 9, 0, 0, 0, 0, 4, 5],
                [4, 9, 0, 0, 0, 0, 0, 0, 0],
                [8, 0, 3, 0, 5, 0, 9, 0, 2],
                [0, 0, 0, 0, 0, 0, 0, 3, 6],
                [9, 6, 0, 0, 0, 0, 3, 0, 8],
                [7, 0, 0, 6, 8, 0, 0, 0, 0],
                [0, 2, 8, 0, 0, 0, 0, 0, 0]
            ],
            ready: false,
            time: 0
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                ready: true,
                time: performance.now()
            });
        }, 5000)
        this.setState({
            board: getGrid(this.props.k)
        }, () => {
            this.fillSudokuBoard();
        });
    }

    fillSudokuBoard = () => {
        this.setState({
            matrix: this.state.board.map(row => {
                return row.map(col => {
                    return col === 0 ? ' ' : col
                }); 
            }),
            time: performance.now()
        })
    }

    onButtonTileClick = (i) => {
        let tile = i + 1
        if(tile >= 1 && tile <= 9) {
            this.setState({
                value: tile
            });
        } else if(tile === 10) {
            this.setState({
                value: tile
            })
        } else if(tile === 11) {

        } else if(tile === 12) {
            this.fillSudokuBoard();
        }
    }

    onSudokuTileClick = (i, j) => {
        if(this.state.board[i][j] !== 0) return;
        this.setState(({ matrix }) => ({
            matrix: matrix.map((row, x) => {
                return row.map((tile, y) => {
                    if(x === i && y === j) return this.state.value >= 1 && this.state.value <= 9 ?  this.state.value : ' ';
                    else return tile;
                });
            })
        }), () => {
            if(checkIfGridIsCompleted(this.state.matrix) === true) {
                // check if given grid is completed correctly
                if(validGrid(this.state.matrix) === true) {
                    this.props.setTime(performance.now() - this.state.time);
                    this.props.history.push('/winner');
                }
            }
        });
    }

    renderSudoku() {
        return (
            <ul className='sudoku-ul'>
                {
                    this.state.matrix.map((row, i) => {
                        return row.map((e, j) => {
                            return <li onClick={() => this.onSudokuTileClick(i, j)} className='sudoku-li' key={10 * i + j}><span className={this.state.board[i][j] === 0 ? 'inp' : ''}>{e}</span></li>
                        })
                    })
                }
            </ul>
        )
    }

    renderInputs = () => {
        return (
            <ul className='buttons-ul'>
                {
                    this.state.buttons.map((button, index) => {
                        return (
                            <li onClick={() => this.onButtonTileClick(index)} key={index}  className='buttons-li'>
                                <button className={`buttons-button ${this.state.value - 1 === index ? 'selected-button' : ''}`}>{button}</button>
                            </li>
                        );
                    })
                }
            </ul>
        )
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.setState(({ matrix }) => ({
            matrix: matrix.map((row, i) => {
                return row.map((tile, j) => {
                    if(i === this.state.row && j === this.state.column) return this.state.value;
                    else return tile;
                });
            })
        }));
    }

    render() {
        return (
            <div>
                {
                    this.state.ready ?
                    <div>
                        {this.renderSudoku()}
                        {this.renderInputs()}
                    </div>
                    :
                    <Loader />
                }
            </div>
        )
    }
}

export default Sudoku;