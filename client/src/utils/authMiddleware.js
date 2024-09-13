import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { addUser, removeUser, setToken } from "./userSlice";
import axios from "axios";
import { USER_API_END_POINT } from "./constants";

export const useAuthMiddleware = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, token} = useSelector((state) => state?.user);
    console.log(user + token);
    
    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(`${USER_API_END_POINT}/checkAuth`,{
                withCredentials: true
            });
            if(response.data.success){
                dispatch(addUser(response.data.user))
                dispatch(setToken(response.data.token))
            }else{
                dispatch(removeUser())
            }
        } catch (error) {
            console.error("Auth check error:", error);
            dispatch(removeUser());
        }
    }
    
    useEffect(() => {
        checkAuthStatus();
    }, []);

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath === '/' && user) {
          navigate('/browse');
        } else if (currentPath !== '/' && !user) {
          navigate('/');
        }
    }, [user, navigate]);
    
    return { checkAuthStatus };
    
};
