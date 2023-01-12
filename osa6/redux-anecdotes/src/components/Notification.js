import { useSelector, useDispatch } from "react-redux"
import { clearMessage } from "../reducers/notificationReducer"

const Notification = () => {
	const notification = useSelector(state => state.notification)
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}

	const dispatch = useDispatch()
	setTimeout(() => dispatch(clearMessage()), 5000)
	
	if (notification.length > 0) {
		return (
			<div style={style}>
				{notification}
			</div>
		)
	}
	else {
		return (<div />)
	}
}

export default Notification