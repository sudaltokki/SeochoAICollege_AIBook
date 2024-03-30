import { useNavigate } from "react-router-dom";

import './Main.css';
import bgimage from './assets/main/bg_main.png';

const Main = () => {
    const navigate = useNavigate();

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                    width: '100vw', height: '100vh', /*backgroundColor: "#F5F6CE",*/}}>
            <img src={bgimage} style={{ position: "fixed", width: '100%', height: '100%', /*backgroundColor: "red"*/ }} />
            <div className="login_signup" >
                <input type="button" onClick={() => { navigate('/Keyword'); }} className="img_button_keyword"/>
            </div>
        </div>

    );
};

export default Main;