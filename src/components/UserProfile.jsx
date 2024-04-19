import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './UserProfile.css'
import axios from 'axios';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};
        this.state = {
            userId: userData._id, // assuming the userData stored in localStorage includes `_id`
            username: userData.username || '',
            lastname: userData.lastname || '',
            email: userData.email || '',
            phone: userData.phone || '',
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    saveProfile = async () => {
        const { userId, username, lastname, email, phone } = this.state;
        try {
            const response = await axios.put(`http://localhost:1234/user/users/${userId}`, {
                username,
                lastname,
                email,
                phone
            });
            console.log('Profile Updated:', response.data);
            // Update local storage if necessary
            localStorage.setItem("userData", JSON.stringify({...this.state, userId}));  // ensure local storage is updated correctly
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    render() {
        return (
            <div className="user-profile">
                <h1>User Profile</h1>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.handleInputChange}
                    />
                </div>
                <button onClick={this.saveProfile}>Save</button>
                {this.state.successMessage && <p>{this.state.successMessage}</p>} {/* Display success message */}
            </div>
        );
    }
};

export default UserProfile;