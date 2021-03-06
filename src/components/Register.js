import { useState } from 'react'
import axios from 'axios';

import { Container, Form, Button, Alert } from 'react-bootstrap'
import './Register.scss'

export default function Register(props) {
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault()
    const newUser = {
      name: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value
    }
    // *** security must be #1 priority ***
    if (newUser.password.length < 1) {
      setError('Password must be 1 characters or longer')
    } else if (newUser.name.length < 2) {
      setError('Name must be at least 2 characters long')
    } else {
      setError(null)
      axios.post('http://localhost:3030/users/register', newUser).then((res) => {
        props.handleCookie(res.data)
        props.setLoggedIn(true)
      }).catch((err) => {
        setError('Email already taken')
      })
    }

  }

  return (
    <Container>
      <div className="login-container">
        <div className="container login-form-container">
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="registerTitle">Register</div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div className="button-container">
              <div>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            </div>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  )
}