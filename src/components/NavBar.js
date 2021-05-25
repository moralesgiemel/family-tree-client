import Navbar from 'react-bootstrap/NavBar'
export default function NavBar(){

return (

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Family Tree</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        </Navbar.Collapse>
    </Navbar>
)

}