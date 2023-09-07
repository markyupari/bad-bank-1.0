import { UserContext } from './context'
import { useContext } from 'react';

function AllData(){
    const user = useContext(UserContext);
    return(
        <h1>AllData<br/> 
        {JSON.stringify(user)}</h1>
    )
}
export default AllData