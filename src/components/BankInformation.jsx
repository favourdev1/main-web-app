import React, { useState } from 'react';
import { styles } from '../constants';
// import { plus } from '../assets';

const BankInformation = () => {
    const [acctDetails, setAcctDetails] = useState([1]);
    const [formDetails, setFormDetails] = useState({
        bankName: "",
        
    });
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const [added, setAdded] = useState(false);
    return (
        <div className='px-10 py-10'>
            
            <button className={`${styles.button} w-auto float-right`} onClick={() => setAdded(!added)}>
                {/* <span className='flex'> */}
                    {/* <img src={plus} alt="" className='w-4 h-5'/> */}
                    <p className='text-white text-xs w-auto'>New account</p>
                {/* </span> */}
            </button>
            <div className='py-20'>
                <div className='flex justify-between px-4 py-4 bg-gray-100 border-b border-black'>
                    <p className='font-semibold text-lg text-black'>Bank name</p>
                    <p className='font-semibold text-lg text-black'>Account number</p>
                    <p className='font-semibold text-lg text-black'>Account name</p>
                    <p className='font-semibold text-lg text-black invisible'>Action</p>
                </div>
                {acctDetails.map((item) => {
                    return (
                        <div className='flex justify-between px-4 py-4 '>
                            <p className='text-base text-black opacity-70'>GT Bank Plc.</p>
                            <p className='text-base text-black opacity-70'>0123456789</p>
                            <p className='text-base text-black opacity-70'>Omole Daniel</p>
                            <div className='my-auto flex hover:cursor-pointer group'>
                                <p className="text-xs mx-2 group-hover:text-brand-secondary">Delete bank details</p>
                                <svg xmlns="http://www.w3.org/2000/svg" className='w-3 h-3 group-hover:fill-brand-secondary fill-brand-primary hover:fill-brand-secondary' viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                            </div>
                        </div>
                    )
                })}
            </div>
            
            <div className={added ? 'h-full grid overflow-hidden place-content-center w-full top-0 right-0 left-0 bottom-0 z-30 outline-none fixed' : ' -translate-x-full hidden'}>
                <div className='mx-auto bg-white shadow-lg rounded lg:w-3/4 w-11/12 lg:h-[auto] h-auto lg:px-10 px-6 py-7'>
                    <div className='flex justify-end item-end hover:cursor-pointer mb-5' onClick={() => setAdded(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-6 fill-black' viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
                    </div>

                    <form action=""></form>

                    
                </div>
            </div>
        </div>
    )
}

export default BankInformation;