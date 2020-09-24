import React, { Fragment, useEffect, useState } from 'react'

import ReactDOM from 'react-dom'
import Users from './Users'


const UserIndex = () => {

    const [loginUser, setLoginUser] = useState()
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await axios.get('/api/users')
        setLoginUser(response.data.loginUser)
        setAllUsers(response.data.allUsers)
    }

    return (
        <Fragment>
            <Users users={allUsers} loginUser={loginUser} />
        </Fragment>
    )
}

export default UserIndex

if (document.getElementById('userIndex')) {
    ReactDOM.render(<UserIndex />, document.getElementById('userIndex'))
}