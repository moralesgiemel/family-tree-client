// React
import {useEffect, useState} from 'react'
import { Redirect } from 'react-router'

// Modules
import axios from 'axios'
import swal from 'sweetalert2'

// App Helper
import AppHelper from '../app_helpers'
import results from '../results'

// Custom Css
import '../styles/EditMember.css'

// React Bootstrap Components
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'


export default function EditMember(props){

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [willRedirect, setWillRedirect] = useState(false)

    let data = {}
    let memberId = props.match.params.id;
    

    useEffect(()=>{
        getMember(memberId)
    },[])
  

    useEffect(()=>{
        if(
            firstName !== '' && 
            lastName !== '' &&
            email !== '' &&
            age !== '' &&
            birthDate !== ''
        ){ 
           setIsValid(true)
        } else {
            setIsValid(false)
        } 

    },[firstName, lastName, email, age, birthDate, isValid])
   



    function getMember(id){

        // console.log(id)
        
        axios.get(`${AppHelper.API_URL}/members/${id}`)
        .then(function (response) {
            // console.log(response)
            // console.log(response.data)
            data = response.data
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
            
            setFirstName(data.first_name)
            setLastName(data.last_name)
            setEmail(data.email)
            setAge(data.age)
            setBirthDate(data.birthDate)


        });
    }


    function editMember(e){
        e.preventDefault();
        
        let payload = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            age: age,
            birthDate: birthDate
        }

        axios.put(`${AppHelper.API_URL}/members/edit/${memberId}`, payload)
        .then(response => {
            // console.log(response)
            if(response){
                swal.fire({
                    ...results.result.editMemberSuccess
                })

                setWillRedirect(true)
            }
        })
        .catch(err => {
            console.log(err)
        })
        .then(function () {});
   
    }


    return (
        <>

            {
                willRedirect === true
                ?   <Redirect to='/'/>
                :
                    <div>
                        <h2 className="mt-5 text-center">Edit Member</h2>
                        <Card className="card-form">
                            <Form className="form" onSubmit={ e => editMember(e) }>
                                <Form.Row>
                                    <Col> 
                                        <Form.Group controlId="firstName">
                                            <Form.Control type="text" placeholder="First Name" value={firstName} onChange={ e => setFirstName(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={ e => setLastName(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder="Email" value={email} onChange={ e => setEmail(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="number" placeholder="Age" value={age} onChange={ e => setAge(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Birth Date</Form.Label>
                                            <Form.Control type="date" value={birthDate} onChange={ e => setBirthDate(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                {
                                    isValid
                                    ?  <Button variant="primary" type="submit"> Submit</Button>
                                    :  <Button variant="primary" type="submit" disabled> Submit</Button>
                                }
                                
                            </Form>
                        </Card>
                    </div>
            }
        </>
    )
}