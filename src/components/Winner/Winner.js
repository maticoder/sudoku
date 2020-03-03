import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Winner.css';

class Winner extends Component {
    msToTime = (s) => {
        function pad(n, z) {
            z = z || 2;
            return ('00' + n).slice(-z);
        }

        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
      }

    render() {
        return (
            <div className="winner">
                <h1 className="congratz">You win!</h1>
                <p className='took'>It took you:</p>
                <p className='time'>{this.msToTime(this.props.time)}</p>
                <Link to="/">
                    <button className='again'>Play again</button>
                </Link>
            </div>
        )
    }
}

export default Winner;