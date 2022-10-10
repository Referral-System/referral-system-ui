import React from 'react';
import './notfound.scss'

const NotFound = () => {
    return (
        <div className="Page404">
            <body>
            <section id="not-found">
                <div className="circles">
                    <p>404<br/>
                        <small>PAGE NOT FOUND</small>
                    </p>
                    <span className="circle big"></span>
                    <span className="circle med"></span>
                    <span className="circle small"></span>
                </div>
            </section>
            </body>

        </div>
    );
}

export default NotFound;
