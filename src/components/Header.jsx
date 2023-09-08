import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
     <Navbar>
        <Container>
          <Navbar.Brand >
          <Link to={'/'} style={{textDecoration:'none'}}>
               <i className='fa-solid fa-layer-group fa-flip me-2'></i>
                Ems Application
                </Link>
              </Navbar.Brand>
        </Container>
      </Navbar></>
  )
}

export default Header