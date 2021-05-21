import React, { useState, useEffect } from 'react'
import {Formik, setIn} from 'formik'
import axios from 'axios'

const UpdateClientComponent = props => {
    const [bankId, setBankId] = useState(props.match.params.bankId)
    const [clientId, setClientId] = useState(props.match.params.clientId)

    // const [firstName, setFirstName] = useState('')
    // const [lastName, setLastName] = useState('')
    // const [phoneNumber, setPhoneNumber] = useState('')
    // const [address, setAddress] = useState('')
    // const [email, setEmail] = useState('')
    const [inputsDate, setInputsDate] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        email: ''
    })

    useEffect(async () => {
        const response = await axios.get(`http://localhost:8080/clients/${clientId}`)
        setInputsDate({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phoneNumber: response.data.phoneNumber,
            address: response.data.address,
            email: response.data.email
        })
        // setFirstName(response.data.firstName)
        // setLastName(response.data.lastName)
        // setPhoneNumber(response.data.phoneNumber)
        // setAddress(response.data.address)
        // setEmail(response.data.email)
    }, [])

    const onChange = event => {
        setInputsDate({
            ...inputsDate,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = async event => {
        event.preventDefault()
        await axios.put(`http://localhost:8080/${bankId}/clients/${clientId}/editClient`, inputsDate)

        props.history.push(`/clients/${bankId}`)
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
            <label>
                <p>Address:</p>
                <input
                    type={'text'}
                    name={'address'}
                    value={inputsDate.address}
                    onChange={onChange}
                />
            </label>
            <label>
                <p>Email:</p>
                <input
                    type={'text'}
                    name={'email'}
                    value={inputsDate.email}
                    onChange={onChange}
                />
            </label>

            <button type={'submit'}>Update</button>
        </form>
    )
}

export default UpdateClientComponent