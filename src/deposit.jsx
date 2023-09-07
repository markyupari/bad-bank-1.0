import { UserContext } from './context'
import { useContext } from 'react';

function Deposit(){
    const user = useContext(UserContext);
    return(
        <h1>Deposit<br/> 
        {JSON.stringify(user)}</h1>
    )
}
export default Deposit