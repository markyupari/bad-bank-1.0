import { UserContext } from "./context";
import { useContext } from "react";

function Login(){
    const user = useContext(UserContext);
    return(
        <h1>Login<br/> 
        {JSON.stringify(user)}</h1>
    )
}
export default Login