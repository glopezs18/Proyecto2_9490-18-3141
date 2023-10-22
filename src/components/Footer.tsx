import React, { Component } from 'react'
import '../styles/footer.scss';

class Footer extends Component {
    render() {
        return (
            <div id="Footer" className="footer">
                <div className="container">
                    <footer className="py-3">
                        <ul className="nav flex-column justify-content-center border-bottom pb-3 mb-3">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Giancarlo André López Silva / 9490-18-314 / Sección A</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Elmer Andrée Belloso Nimatuj / 9490-17-12488 / Sección B</a></li>                            
                        </ul>
                        <p className="text-center text-muted">&copy; Desarrollo Web - 2023</p>
                    </footer>
                </div>
            </div>
        );
    }
}

export default Footer