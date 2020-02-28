import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
// import axios from 'axios';

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
           const res = await fetch('./api/v1/transactions');
           console.log(res.data.data);
           dispatch({
                type: 'GET_TRANSACTION',
                payload: res.data.data
            });
       } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
       }
    }

    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
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