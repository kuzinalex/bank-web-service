import React, { useState, useEffect } from 'react'
import {Formik, setIn} from 'formik'
import axios from 'axios'

const UpdateBankComponent = props => {
    const [bankId, setBankId] = useState(props.match.params.bankId)

    const [inputsDate, setInputsDate] = useState({
        name: ''
    })

    useEffect(async () => {
        const response = await axios.get(`http://localhost:8080/${bankId}`)
        setInputsDate({
            name: response.data.name
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
        await axios.put(`http://localhost:8080/${bankId}/edit`, inputsDate)

        props.history.push(`/`)
    }

    return (
        <form onSubmit={onSubmit}>
            <label>
                <p>Name:</p>
                <input
                    type={'text'}
                    name={'name'}
                    value={inputsDate.name}
                    onChange={onChange}
                />
            </label>
            <button type={'submit'}>Update</button>
        </form>
    )
}

export default UpdateBankComponent