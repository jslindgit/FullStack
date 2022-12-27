import { useState } from 'react'

const LoginForm = ({ login }) => {
	const [username, setUserName] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()		
		const success = await login({ username, password })
		if (success) {
			setUserName('')			
		}
		setPassword('')	
	}

	return (
		<div>
			<h2>Login</h2>
			
			<form onSubmit={handleSubmit}>
				<div>
					username &nbsp; 
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUserName(target.value)}
					/>
				</div>
				<br />
				<div>
					password &nbsp;
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<br />
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default LoginForm