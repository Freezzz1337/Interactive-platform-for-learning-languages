import {Button, Container, Form, InputGroup, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {BiSearch} from "react-icons/bi";
import React from "react";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigation = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        navigation("/auth", {state:{isAuthenticatedPage:true}});
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        navigation("/auth", {state:{isAuthenticatedPage:false}});
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary border-bottom">
            <Container fluid>
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll>
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex me-2">
                        <InputGroup>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                className="bg-white border rounded-pill shadow"
                                style={{width: "250px"}}
                            />
                            <Button variant="outline-success"
                                    className="bg-white border rounded-pill shadow">
                                <BiSearch/>
                            </Button>
                        </InputGroup>
                    </Form>
                    <div className="text-center mt-2 mt-lg-0">
                        <Button variant="outline-dark" className="me-2" onClick={handleLogin}>Login</Button>
                        <Button variant="outline-warning" style={{color: "black"}}
                                onClick={handleSignUp}>Sign-up</Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Header;