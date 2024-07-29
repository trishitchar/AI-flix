import { useNavigate } from "react-router-dom";


export const GoToHomePage = () => {
    const navigate = useNavigate();
    navigate('/')
}