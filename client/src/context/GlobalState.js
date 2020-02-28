import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial State
const initialState = {
    transactions: [],
    error: null,
    loading: true
}

// Create Context
export const GlobalContext = createContext(initialState);


// Provider Component
export const GlobalProvider = ({ children  }) => {
    const [ state, dispatch ] = useReducer(AppReducer, initialState);

    // Actions
    async function getTransactions() {
       try {
           const res = await axios.get('/api/v1/transactions');
           dispatch({
                type: 'GET_TRANSACTION',
                payload: res.data.data
            });
       } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.res.data.error,
            });
       }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.res.data.error,
            });
        }
        
    }
    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        });
    }

    return (<GlobalContext.Provider value={{ 
            transactions: state.transactions, 
            error: state.error,
            loading: state.loading,
            getTransactions,
            deleteTransaction, 
            addTransaction 
        }}>
        { children }
    </GlobalContext.Provider>)
}