import React, { useState, useEffect } from 'react';
import { useToken } from '../user-components/token';
import './user-detail.css'

function UserDetail() {
    const [account, setAccount] = useState([])
    const { token } = useToken();

    useEffect(() => {
        const fetchData = async () => {
          const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;
          const fetchConfig = {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          };
          const response = await fetch(url, fetchConfig);
          if (response.ok) {
            const data = await response.json();
            setAccount(data.account);
          }
        };
        if (token){
            fetchData()
        }
    }, [token])

    return (
        <div className="user-detail-page">
            <div className="user-detail-container">
                <div className="user-detail-card-container">
                    <div className="card card-purple" style={{backgroundColor: "purple"}}>
                        <img src={account.avatar} className="user-avatar test" alt="User Avatar"/>
                        <div className="avatar-circle"></div>
                        <div className="card-body card-purple">
                            <div className="pink-box">
                                <h5 className="card-title">Username</h5>
                                <p className="card-text">{account.username}</p>
                            </div>
                            <div className="pink-box">
                                <h5 className="card-title">Name</h5>
                                <p className="card-text">{account.full_name}</p>
                            </div>
                            <div className="pink-box">
                                <h5 className="card-title">Email</h5>
                                <p className="card-text">{account.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }
export default UserDetail;
