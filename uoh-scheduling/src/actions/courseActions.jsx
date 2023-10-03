import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import {
 COURSE_SUBMIT_REQUEST,
 COURSE_SUBMIT_SUCCES,
 COURSE_SUBMIT_FAIL,
 COURSE_GET_REQUEST,
 COURSE_GET_SUCCESS,
 COURSE_GET_FAIL
} from '../constants/courseConstants';


export const del = () => (disptach) => {
    localStorage.removeItem('courseInfo')
    disptach({type: });
    //TODO...
}

export const add = ( name, code, semester, catedras, ayudantias ) => async (dispatch) => {

    //TODO...
    try {
        dispatch({ type: COURSE_SUBMIT_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

     const data = await axios.get(
            'http://127.0.0.1:8000/api/getCourses',
         { 'name': name, 'code': code , 'semester': semester, 'catedras': catedras, 'ayudantias': ayudantias } 
    )  
         dispatch({
            type: COURSE_SUBMIT_SUCCES,
            payload: data
        })

    localStorage.setItem('courseName', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: COURSE_SUBMIT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
