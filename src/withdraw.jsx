import { UserContext } from "./context"
import { useContext } from "react"

function Withdraw(){
    const user = useContext(UserContext);
    return(
        <h1>Withdraw<br/>
        {JSON.stringify(user)}</h1>
    )
}
export default Withdraw