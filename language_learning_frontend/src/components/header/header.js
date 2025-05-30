import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/auth-context";
import WindowCreateFolder from "../window-components/window-create-folder";

const Header = () => {
    const navigation = useNavigate();
    const {isAuthenticated, logout} = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        navigation("/useAuth", {state: {isAuthenticatedPage: true}});
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        navigation("/useAuth", {state: {isAuthenticatedPage: false}});
    }
    const handleLogOut = (e) => {
        e.preventDefault();
        logout();
        navigation("/");
    }

    const handleHome = (e) => {
        e.preventDefault();
        navigation("/home");
    }
    const handleCreateSet = (e) => {
        e.preventDefault();
        navigation("/createSet");
    }

    const [showCreateFolder, setShowCreateFolder] = useState(false);

    const handleCreateFolder = () => {
        setShowCreateFolder(true);
    }

    const handleCloseCreateFolder = () => {
        setShowCreateFolder(false);
    }

    const handleSetPage = (e) => {
        e.preventDefault();
        navigation("/sets");
    }

    const handleFolderPage = (e) => {
        e.preventDefault();
        navigation("/folders");
    }
    return (
        <>
            <Navbar expand="lg" style={{backgroundColor: "#fbf6ef"}} className=" border-bottom">
                <Container fluid>
                    <Navbar.Brand href="#">Wordly</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <div className="text-center me-auto my-2 my-lg-0">
                            <Nav>
                                <Nav.Link onClick={handleHome}>Home</Nav.Link>

                                <NavDropdown title="My library">
                                    <NavDropdown.Item onClick={handleSetPage}>Sets</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleFolderPage}>Folders</NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="Create">
                                    <NavDropdown.Item onClick={handleCreateSet}>Create set</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleCreateFolder}>Create folder</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#" disabled>
                                    Link
                                </Nav.Link>
                            </Nav>
                        </div>

                        <div className="text-center mt-2 mt-lg-0">
                            {isAuthenticated ?
                                <Button variant="outline-dark" className="me-2" onClick={handleLogOut}>Log
                                    out</Button> :
                                <>
                                    <Button variant="outline-dark" className="me-2" onClick={handleLogin}>Login</Button>
                                    <Button variant="outline-warning" style={{color: "black"}}
                                            onClick={handleSignUp}>Sign-up
                                    </Button>
                                </>
                            }

                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <WindowCreateFolder show={showCreateFolder}
                                handleClose={handleCloseCreateFolder}
            />
        </>
    );
}
export default Header;
