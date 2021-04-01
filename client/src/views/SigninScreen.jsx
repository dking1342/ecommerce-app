import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

const SigninScreen = (props) => {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const userSignin = useSelector((state)=> state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email,password))
    }

    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect)
        }
    },[userInfo, props.history, redirect])

    return (
        <div>
            <form onSubmit={submitHandler} action="" className="form">
                <div>
                    <h1>Sign In</h1>
                </div>
                {
                    loading && <Loading></Loading>
                }
                {
                    error && <MessageBox variant="danger">{error}</MessageBox>
                }
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter email" required onChange={e=> setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" required onChange={e=> setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor=""></label>
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label htmlFor=""></label>
                    <div>
                        New customer?{' '}
                        <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SigninScreen
