import React, { useEffect, useContext } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './auth/auth';

export default function SignUp() {
	const history = useNavigate();
	const auth = useContext(AuthContext);

	useEffect(() => {
		const response = axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
		auth.signout();
		history('/login');
	});
	return <div>Logout</div>;
}
