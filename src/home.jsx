import { UserContext } from './context'
import { useContext } from 'react';
import CardTemplate from './cardtemplate'
import Card from 'react-bootstrap/Card';

function Home(){
    const user = useContext(UserContext);
    return(
        <CardTemplate
            color="secondary"
            textcolor="white"
            title="BadBank landing page"
            subtitle="Welcome to your BadBank"
            text="You should not use this bank"
            body={<Card.Img variant="top" className='img-fluid' src="./src/assets/bank_logo.png" alt='Bank Logo image'/>}
        />
    )
}
export default Home