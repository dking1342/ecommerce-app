import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import Loading from './../components/Loading';
import MessageBox from './../components/MessageBox';

const ProfileScreen = () => {
    const userSignin = useSelector(state=> state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector(state=> state.userDetails);
    const { loading, error, user } = userDetails;

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(detailsUser(userInfo._id))
    },[dispatch, userInfo._id])

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(updateUserProfile())
    }

    return (
        <div>
            <form onSubmit={submitHandler} className="form">
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading 
                        ? <Loading></Loading>
                        : error
                        ? <MessageBox variant="danger">{error}</MessageBox>
                        : (
                            <>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" placeholder="Enter name" defaultValue={user.name} readOnly />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" placeholder="Enter email" defaultValue={user.email} readOnly />
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" placeholder="Enter password"  />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input type="password" id="confirmPassword" placeholder="Enter confirmed password"  />
                                </div>
                                <div>
                                    <button className="primary" type="submit">Update</button>
                                </div>
                            </>
                        )
                }
            </form>
        </div>
    )
}

export default ProfileScreen
