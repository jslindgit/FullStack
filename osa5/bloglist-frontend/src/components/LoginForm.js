import { useState } from 'react'
import PropTypes from 'prop-types'

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
						id="input-username"
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
						id="input-password"
					/>
				</div>
				<br />
				<button id="button-login" type="submit">login</button>
			</form>
		</div>
	)
}

LoginForm.propTypes = {
	login: PropTypes.func.isRequired
}

export default LoginForm