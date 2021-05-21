import React, { useState, useEffect } from 'react'
import {Formik, setIn} from 'formik'
import axios from 'axios'

const UpdateWorkerComponent = props => {
    const [bankId, setBankId] = useState(props.match.params.bankId)
    const [workerId, setWorkerId] = useState(props.match.params.workerId)

    const [inputsDate, setInputsDate] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: ''
    })

    useEffect(async () => {
        const response = await axios.get(`http://localhost:8080/workers/${workerId}`)
        setInputsDate({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phoneNumber: response.data.phoneNumber,
        })

    }, [])

    const onChange = event => {
        setInputsDate({
            ...inputsDate,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = async event => {
        event.preventDefault()
        await axios.put(`http://localhost:8080/${bankId}/workers/${workerId}/editWorker`, inputsDate)

        props.history.push(`/workers/${bankId}`)
    }

    return (
        <form onSubmit={onSubmit}>
            <label>
                <p>First name:</p>
                <input
                    type={'text'}
                    name={'firstName'}
                    value={inputsDate.firstName}
                    onChange={onChange}
                />
            </label>
            <label>
                <p>Last name:</p>
                <input
                    type={'text'}
                    name={'lastName'}
                    value={inputsDate.lastName}
                    onChange={onChange}
                />
            </label>
            <label>
                <p>Phone number:</p>
                <input
                    type={'text'}
                    name={'phoneNumber'}
                    value={inputsDate.phoneNumber}
                    onChange={onChange}
                />
            </label>
            <button type={'submit'}>Update</button>
        </form>
    )
}

export default UpdateWorkerComponent