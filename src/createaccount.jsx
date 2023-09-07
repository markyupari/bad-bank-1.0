import Button from 'react-bootstrap/Button'
import CardTemplate from './cardtemplate';
import { UserContext } from './context'
import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form'

function CreateAccount(){
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState(''); //true=create new account false=success create another account?
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useContext(UserContext);

    function validate(field, label){
        if(!field) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }

    function handleCreate(){
        console.log(name, email, password);
        if(!validate(name, 'name')) return;
        if(!validate(email, 'email')) return;
        if(!validate(password, 'password')) return;
        user.users.push({name,email,password,balance:100});
        setShow(false);
    }

    function clearForm(){
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
    }

    return(
        <CardTemplate
            color="secondary"
            textcolor="white"
            title="Create account"
            subtitle="Your first step to a terrible mistake"
            text="You should not create an account in this bank"
            status={status}
            body={show ? (
                <>
                    <Form.Group className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type='input'
                            id='name'
                            placeholder='Enter your name'
                            value={name}
                            onChange={e => setName(e.currentTarget.value)}
                            />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type='email'
                            id='email'
                            placeholder='Enter a valid email'
                            value={email}
                            onChange={e => setEmail(e.currentTarget.value)}
                            />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type='password'
                            id='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={e => setPassword(e.currentTarget.value)}
                            />
                    </Form.Group>
                    <Button 
                        type="submit"
                        variant="light"
                        onClick={handleCreate}>Create account</Button>
                </>
            ):(
                <>
                    <h5>Success</h5>
                    <Button 
                        type="submit"
                        variant="light"
                        onClick={clearForm}>Create another account</Button>
                </>
            )
                
            }
        />

    )
}
export default CreateAccount