import { UserContext } from './context'
import { useContext } from 'react';

function Balance(){
    const user = useContext(UserContext);
    return(
        <h1>Balance<br/> 
        {JSON.stringify(user)}</h1>
    )
}
export default Balance