import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

interface GameMenuProps {

}

const GameMenu: React.FC<RouteComponentProps & GameMenuProps> = (props) => {
    return (
        <>
            <div className="menu">
                <div className="logo">CHESS</div>
                <div className="menu-button">       
                    <Link to="/board/">Play</Link>
                    <button>Exit</button>
                </div>
            </div>
        </>
    )
}
export default GameMenu;