
import {useEffect, useState} from 'react'
import { Redirect } from 'react-router'
import Link from 'react-router-dom/Link'

// Modules
import axios from 'axios'
import moment from 'moment'
import swal from 'sweetalert2'

// App Helpers
import AppHelper from '../app_helpers'
import results from '../results'

// Custom CSS
import '../styles/Member.css'

// React Bootstrap Components
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


export default function Member(props){

    let data = {}
    const [member, setMember] = useState([]);
    const [willRedirect, setWillRedirect] = useState(false)

    let memberId = props.match.params.id;

  
    useEffect(()=>{
        getMember(memberId);
    },[])

    function getMember(id){

        // console.log(id)
        
        axios.get(`${AppHelper.API_URL}/members/${id}`)
        .then(function (response) {
            // console.log(response)
            // console.log(response.data)
            data = response.data
            // console.log(data)

         
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
            
            setMember(
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={data.profile_pic} />
                <Card.Body>
                    <Card.Title>{data.first_name} {data.last_name}</Card.Title>
                    <Card.Text>
                        <i>{data.email}</i><br/>
                        Age: {data.age} <br/>
                        Birthdate: {moment(data.birthDate).format('MMMM Do YYYY')}
                    </Card.Text>
                 
                    <Button variant="warning" className="mr-2"><Link to={`edit/${data._id}`} className="link">Edit</Link></Button>
                    <Button variant="danger" onClick={ e => deleteMember(data._id)}>Delete</Button>
                </Card.Body>
                </Card>
            )

        });
    }



    function deleteMember(id){
        console.log(id)

        axios.delete(`${AppHelper.API_URL}/members/delete/${id}`)  
        .then(function (response) {
            console.log(response)

            swal.fire({
                ...results.result.deleteSuccess
            })

            setWillRedirect(true)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {});
    }

    return (
        <>
            
            {
                willRedirect === true
                ? <Redirect to='/'/>
                :
                <div className="member-container mt-5">
                 {
                     member
                 }
                </div>
            }
           
           
        </>
    )
}