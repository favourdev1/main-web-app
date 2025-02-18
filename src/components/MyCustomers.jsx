import React, { useState, useEffect } from 'react';
import { noCustomer } from '../assets';
import {styles} from '../constants/index';
import { BASE_URL } from '../services/services';
import Cookies from 'js-cookie';
import axios from 'axios';
import { TableCell } from '@mui/material';
import Orders from './Orders';

const details = ["Name", "Email", "Phone", "Last seen"];

const MyCustomers = () => {
    // State to store the customers gotten from the API
    const [customers, setCustomers] = useState([]);
    
    const token = Cookies.get("_tksr");

    // Function to update the state to the next five or so customer details gotten from the API.
    const handleNext = () => {
        setCustomers((prev) => {
            return prev = [0, 2, 3];
        });
    }

    const handleCustomerSearch = (searchValue) => {
        // Logic for searching for a specific transaction history by setting the transaction history state to the data gotten from the API following the users prompt.
        // alert(searchValue);
    }

    async function fetchCustomers(token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          'Content-Type': 'application/json',
        };
    
        try {
        //   const res = await axios.get(`${BASE_URL}store_settings/store_details`, config);
          const res = await axios.get(`${BASE_URL}store/list/`, config);
          if (res) {
            // console.log(res);
            setCustomers(res.data["Store Details"]);
            // setCustomers(res.data.customers);
          }
        } catch (err) {
          console.log(err);
        }
    }

    useEffect(() => {
        fetchCustomers(token);
    }, []);

    return (
        <div className="mt-6">
            <p className={`${styles.componentHeader}`}>My Customers</p>
            {/* <UserData type={"Customer"} image={noCustomer} handleSearch={handleCustomerSearch} infoHead={details} data={customers} children={Children} handleNext={handleNext}></UserData> */}
            <Orders image={noCustomer} infoHead={details} children={Children} data={customers} type={"Customer"} />
        </div>
    )
}


const Children = ({id, name, email, noOfOrders, location, amount}) => {
    return (
        <>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{noOfOrders}</TableCell>
            <TableCell>{location}</TableCell>
            <TableCell>{amount}</TableCell>
            <TableCell>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" className='w-4 h-4 fill-slate-400'><path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"/></svg>
                </span>
            </TableCell>
        </>
    )
};

export default MyCustomers;