
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginLoading, loginResponse, loginRequest } from "../Reducers/loginSlice"
import { Toast } from '../utilities/notifications.js'
import { Toaster } from "react-hot-toast"

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const successToast = new Toast("Login effettuato con successo!")
    const errorToast = new Toast("Login fallito")


    const doLogin = async (e) => {
        e.preventDefault();
        dispatch(loginRequest(formData))
            .then((action) => {
                if (action.payload && action.payload.token) {
                    successToast.success();
                    setTimeout(() => {
                        navigate("/home", { replace: true });
                    }, 1500);
                } else {
                    errorToast.warning();
                }
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLoginWithGithub = () => {
        window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/github`;
    }

    const handleLoginWithGoogle = () => {
        window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/google`;
    }

    return (
        <>
            <Container className="d-flex justify-content-center mt-3">
                <Card style={{ width: '18rem' }} className="d-flex justify-content-center mt-5 shadow">
                    <Card.Img variant="top" src="https://cdn.learnwoo.com/wp-content/uploads/2019/11/image1-5.jpg" />
                    <Card.Body className="d-flex justify-content-center">
                        <Toaster
                            position="bottom-center" reverseOrder={false} />
                        <Form onSubmit={doLogin}>
                            <Form.Control
                                onChange={handleInputChange}
                                name="email"
                                type="email"
                                placeholder="Inserisci email..."
                                className="my-2"
                            />
                            <Form.Control
                                onChange={handleInputChange}
                                name="password"
                                type="password"
                                placeholder="Inserisci password..."
                                className="my-2"
                            />
                            <div className="d-flex gap-2 justify-content-sm-around ">
                                <Button variant="outline-success" size="sm" type="submit" className="w-100">Login</Button>
                            </div>
                            <div className="">
                                <Button onClick={handleLoginWithGithub} variant="outline-dark" size="sm" type="submit" className="mt-2 w-100 d-flex justify-content-center align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                </svg>Login con github</Button>
                                <Button onClick={handleLoginWithGoogle} variant="outline-dark" size="sm" type="submit" className="mt-2 w-100 d-flex justify-content-center align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                </svg>Login con google</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container >
        </>
    )
}

export default Login