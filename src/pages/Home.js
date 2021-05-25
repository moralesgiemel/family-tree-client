// React
import {useEffect, useState} from 'react'
import Link from 'react-router-dom/Link'

// Modules
import axios from 'axios'

// App Helper
import AppHelper from '../app_helpers'


// Custom CSS
import '../styles/Home.css'

// React Bootstrap Components
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


export default function Home(){

    let family = []
    const [cards, setCards] = useState([])

   


    
    useEffect(()=>{
        getData()
    },[])

    function getData(){
        axios.get(`${AppHelper.API_URL}/members`)
        .then(function (response) {
            console.log(response)
            family = response.data;
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
        
            console.log(family)
            
            setCards(
                family.map(element => {
                    return(
                        <div key={element._id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={element.profile_pic} />
                                <Card.Body>
                                    <Card.Title>{element.first_name} {element.last_name}</Card.Title>
                                    <Button><Link to={`/member/${element._id}`} className="link">See More</Link></Button>
                                </Card.Body>
                            </Card>
                        </div>
                      
                    )           
                })  
            )
        });
    }  

    function addMember(){

    }

    return (
        <>



           <h1 className="text-center mt-5 mb-5">Family</h1>
           <Button variant="success" className="mb-5"><Link to={`/add`} className="link">New Member</Link></Button>
           <div className="family-container">
                
                {
                    cards
                }
           </div>
          
        </>

    )

}