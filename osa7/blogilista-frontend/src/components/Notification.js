import { connect } from 'react-redux'

const Notification = (props) => {
    const notification = props.notification
    if (!notification) {
        return null
    }

    const className = notification.className
        ? notification.className
        : 'notification'

    if (notification.message && notification.message.length > 0) {
        return <div className={className}>{notification.message}</div>
    } else {
        return <div />
    }
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
