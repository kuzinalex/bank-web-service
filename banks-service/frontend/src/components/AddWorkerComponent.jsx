import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'

const AddWorkerComponent = props => {
    const [bankId, setBankId] = useState(props.match.params.bankId)

    const formik = useFormik({

        initialValues: {
            firstName: '',
            lastName: '',
            phoneNumber: ''
        },

        onSubmit: async values => {
            await axios.post(`http://localhost:8080/${bankId}/workers/newWorker`, {
                ...values
            })

            props.history.push(`/workers/${bankId}`)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <label>
                <p>First name:</p>
                <input
                    type={'text'}
                    name={'firstName'}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                />
            </label>
            <label>
                <p>Last name:</p>
                <input
                    type={'text'}
                    name={'lastName'}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                />
            </label>
            <label>
                <p>Phone number:</p>
                <input
                    type={'text'}
                    name={'phoneNumber'}
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                />
            </label>

            <button type={'submit'}>Add</button>
        </form>
    )
}

export default AddWorkerComponent