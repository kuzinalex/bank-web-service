import React, { useState, useEffect } from 'react'
import {Formik, setIn} from 'formik'
import axios from 'axios'

const UpdateBankAccountComponent = props => {
    const [clientId, setClientId] = useState(props.match.params.clientId)
    const [bankAccountId, setAccountId] = useState(props.match.params.accountId)
    console.log(bankAccountId)
    const [inputsDate, setInputsDate] = useState({
        amount: '',
        amountOfCredit: '',
        currency: ''
    })

    useEffect(async () => {
        const response = await axios.get(`http://localhost:8080/accounts/${bankAccountId}`)
        setInputsDate({
            amount: response.data.amount,
            amountOfCredit: response.data.amountOfCredit,
            currency: response.data.currency,
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
        await axios.put(`http://localhost:8080/clients/${clientId}/accounts/${bankAccountId}/editAccount`, inputsDate)

        props.history.push(`/clients/accounts/${clientId}`)
    }

    return (
        <form onSubmit={onSubmit}>
            <label>
                <p>Amount:</p>
                <input
                    type={'text'}
                    name={'amount'}
                    value={inputsDate.amount}
                    onChange={onChange}
                />
            </label>
            <label>
                <p>Amount of credits:</p>
                <input
                    type={'text'}
                    name={'amountOfCredit'}
                    value={inputsDate.amountOfCredit}
                    onChange={onChange}
                />
            </label>
            <label>
                <p>Currency:</p>
                <input
                    type={'text'}
                    name={'currency'}
                    value={inputsDate.currency}
                    onChange={onChange}
                />
            </label>
            <button type={'submit'}>Update</button>
        </form>
    )
}

export default UpdateBankAccountComponent