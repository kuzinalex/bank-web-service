import React, {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import axios from 'axios'

const AddBankAccountComponent = props => {
    const [clientId, setBankId] = useState(props.match.params.clientId)

    const formik = useFormik({

        initialValues: {
            amount: '',
            amountOfCredit: '',
            currency: ''
        },

        onSubmit: async values => {
            await axios.post(`http://localhost:8080/clients/${clientId}/accounts/newAccount`, {
                ...values
            })
            props.history.push(`/clients/accounts/${clientId}`)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <label>
                <p>Amount:</p>
                <input
                    type={'text'}
                    name={'amount'}
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                />
            </label>
            <label>
                <p>Amount of credits:</p>
                <input
                    type={'text'}
                    name={'amountOfCredit'}
                    value={formik.values.amountOfCredit}
                    onChange={formik.handleChange}
                />
            </label>
            <label>
                <p>Currency:</p>
                <input
                    type={'text'}
                    name={'currency'}
                    value={formik.values.currency}
                    onChange={formik.handleChange}
                />
            </label>

            <button type={'submit'}>Add</button>
        </form>
    )
}

export default AddBankAccountComponent