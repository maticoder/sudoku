import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

class Login extends Component {
    onButtonClick = (k) => {
        this.props.changeK(k);
    }

    render() {
        return (
            <div className="login">
                <div className='buttons'>
                    <Link to="/sudoku">
                        <button onClick={() => this.onButtonClick(30)} className='login-button'>Easy</button>
                    </Link>
                    <Link to="/sudoku">
                        <button onClick={() => this.onButtonClick(40)} className='login-button'>Medium</button>
                    </Link>
                    <Link to="/sudoku">
                        <button onClick={() => this.onButtonClick(60)} className='login-button'>Hard</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Login;