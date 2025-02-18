import React, { useState } from 'react';
import { styles } from '../constants/index';
import {
  chartStore,
  today_customer,
  total_orders,
  product,
  naira,
  wallet,
  up_trend,
  down_trend,
  noOrders
} from '../assets';
import axios from 'axios';
import { BASE_URL } from '../services/services';
import { useEffect } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import Cookies from 'js-cookie';
import Orders from './Orders';
import { Status, Children as OrdersChildren, details } from './MyOrders';

function Icon({ icon }) {
  return <div className='rounded-full p-4 h-[32px] w-[32px]'></div>;
}

const MyStore = ({ click }) => {
  const [storeData, setStoreData] = React.useState({
    totalSales: 0,
    totalCustomers: 0,
    totalOrders: 0,
    todayCustomers: 0,
    yesterdayCustomers: 0,
    todaySales: 0,
    yesterdaySales: 0,
    todayProfit: 0,
    yesterdayProfit: 0,
  });

  const token = Cookies.get("_tksr");

  // Stores the amount of sales of the previous days of the week and is to be rendered on the line graph below.
  // const [storeTargetProgress, setStoreTargetProgress] = useState(80);
  const [myOrders, setMyOrders] = useState([]);

  const [name, setName] = useState('');
  const [earnings, setEarnings] = useState("");

  // Stores the amount of sales of the previous days of the week and is to be rendered on the line graph below.
  const [historyProfit, setHistoryProfit] = useState([]);

  // Stores the amount of sales of the previous days of the week and is to be rendered on the line graph below.
  const [historyGrowth, setHistoryGrowth] = useState([]);
  const [productSales, setProductSales] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      };
      const response = await axios.get(`${BASE_URL}store/list`, config);;
      if (response) {
        // const store_name = response.data['Store Details'][0].store_name;
        console.log(response);

        // setName(`Welcome to your Store, ${store_name}`);
        setEarnings(response.data['Store Details'][0].account_balance);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <p className={`${styles.componentHeader} mt-10`}>{name}</p>
      <div className='flex justify-between w-full'>
        <div className='w-full'>
          <div className='lg:flex justify-between'>
            {/* To display the setup status of the store */}
            {/* <div className='flex items-center gap-3 bg-blue-600 shadow-lg rounded-lg p-4 mx-1 w-full lg:w-1/4 mb-3'>
              <div className='rounded-full bg-blue-100 w-[32px] h-[32px] flex justify-center items-center'>
                <img src={chartStore} alt='' className='w-4 h-4' />
              </div>

              <div>
                <p className='text-xs text-white'>Store rating</p>
                <p className='font text-white text-xl'>Impressive</p>
              </div>
            </div> */}

            {/* Displays the total sales of the store so far */}
            <Total
              image={chartStore}
              type={'sales'}
              number={storeData.totalSales}
            ></Total>

            {/* Displays the total customers of the store so far */}
            <Total
              image={today_customer}
              type={'customers'}
              number={storeData.totalCustomers}
            ></Total>

            {/* Displays the total orders of the store so far */}
            <Total
              image={total_orders}
              type={'orders'}
              number={storeData.totalOrders}
            ></Total>
          </div>
        </div>
      </div>

      <div className='lg:flex justify-between'>

        {/* <span className='lg:flex justify-between my-3 lg:my-0 w-full lg:w-1/2'>
          Displays the total number of customers for the day
          <Today
            image={today_customer}
            type={'customers'}
            number={storeData.todayCustomers}
            storeData={storeData}
          />

          Displays the profit made for the day
          <Today
            image={wallet}
            type={'profit'}
            number={storeData.todayProfit}
            storeData={storeData}
          />

          Displays the sales made for the day
          <Today
            image={chartStore}
            type={'sales'}
            number={storeData.todaySales}
            storeData={storeData}
          />
        </span> */}

        <div className='flex items-center gap-3 shadow-lg rounded-lg p-4 mx-1 w-full lg:w-1/3'>
          <div className='rounded-full bg-blue-100 w-[32px] h-[32px] flex justify-center items-center'>
            <img src={chartStore} alt='' className='w-4 h-4' />
          </div>

          <div>
            <p className='text-xs text-black-800 font-bold'>Profit</p>
            {/* <p className='font text-black font-extrabold text-xl'>{`$${0.00}`}</p> */}
            <div className='flex'>
              <img src={naira} alt='' className='w-4 h-4 my-auto' />
              <p className='font text-brand-black text-xl font-Nunito'>{earnings === "" ? "0.00" : earnings}</p>
            </div>
            <div className={`${styles.button} mt-2`}>Withdraw Earnings</div>
          </div>
        </div>

        <div className='bg-white rounded lg:w-2/3 shadow-lg my-4 lg:my-0 px-3 py-3'>
          {/* <p className='text-2xl font-bold pb-24 lg:pb-0 text-black-800'>
            Store target status
          </p>
          <span className='flex lg:mt-[40px] w-full justify-end'>
            <ProgressBar 
              completed={storeTargetProgress} 
              customLabel={storeTargetProgress != 100 ? "Not quite there yet. Keep pushing." : "Yay! You made it!"} 
              bgColor={storeTargetProgress != 100 ? "red" : "green"} 
              height="40px"
              borderRadius='10px'
              labelAlignment='center'
              transitionDuration='5'
              transitionTimingFunction="ease-in-out"
              maxCompleted={100}
              animateOnRender={true} 
              className='w-full'/>
          </span> */}
        </div>
      </div>

      {/* Product sales box of the My Store component */}
      {/* <div className='rounded shadow-xl w-full px-5 py-3 mx-auto my-auto h-auto'>
        <p className={`${styles.componentHeader}`}>Order History</p>

        <div className='flex justify-between mt-10 align-center'>
          <p className='text-sm mr-1'>#</p>
          <span className='flex justify-between'>
            <p className='text-sm mr-1'>Product name</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 320 512'
              className='w-2 h-3 my-auto fill-slate-400'
            >
              <path d='M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z' />
            </svg>
          </span>
          <span className='flex justify-between'>
            <p className='text-sm mr-1'>Sales</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 320 512'
              className='w-2 h-3 my-auto fill-slate-400'
            >
              <path d='M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z' />
            </svg>
          </span>
          <span className='flex justify-between'>
            <p className='text-sm mr-1'>Price</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 320 512'
              className='w-2 h-3 my-auto fill-slate-400'
            >
              <path d='M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z' />
            </svg>
          </span>
          <span className='flex justify-between'>
            <p className='text-sm mr-1'>Stock</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 320 512'
              className='w-2 h-3 my-auto fill-slate-400'
            >
              <path d='M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z' />
            </svg>
          </span>
          <p className='text-sm'>Status</p>
        </div>

        <div className='mt-8'>
          Image and text to be displayed if no data is found
          <img
            src={product}
            alt='No customer found'
            className={
              productSales.length === 0 ? 'mx-auto w-auto h-auto' : 'hidden'
            }
          />
          <p
            className={
              productSales.length === 0 ? 'text-base text-center' : 'hidden'
            }
          >
            You have no product sales yet!
          </p>

          {productSales.map((data, index) => {
            return (
              <div className='mb-3' key={index}>
                <Children
                  id={1}
                  productName={''}
                  sales={0}
                  price={''}
                  stock={''}
                  status={''}
                />
              </div>
            );
          })}
        </div>
      </div> */}
      <div className='mt-8'>
        <p className={`${styles.componentHeader}`}>Order History</p>
        <Orders image={noOrders} infoHead={details} children={OrdersChildren} navigate={click} data={myOrders} type={"My Orders Primary"} />
      </div>
    </div>
  );
};

const Today = ({ image, type, number, storeData }) => {
  return (
    <div className='flex flex-col gap-2 bg-white shadow-lg rounded-lg py-4 px-2 my-3 lg:my-0 mx-1 w-full lg:w-1/3'>
      <div className='rounded-full bg-blue-100 w-[32px] h-[32px] flex justify-center items-center'>
        <img src={image} alt='' className='w-4 h-4 mx-auto' />
      </div>
      <p className='text-xs opacity-50'>{`Today's ${type}`}</p>

      <p
        className={
          type === 'sales' || type === 'profit'
            ? 'hidden invisible'
            : 'font-semibold text-black-800 text-xl'
        }
      >
        {number}
      </p>

      <div
        className={
          type === 'sales' || type === 'profit' ? 'flex' : 'hidden invisible'
        }
      >
        <img src={naira} alt='' className='w-4 h-4 my-auto' />
        <p className='font-semibold text-black-800 text-xl'> {number} </p>
      </div>
      {type === 'sales' && (
        <Rate
          yesterday_value={storeData.yesterdaySales}
          today_value={storeData.todaySales}
        />
      )}
      {type === 'profit' && (
        <Rate
          yesterday_value={storeData.yesterdayProfit}
          today_value={storeData.todayProfit}
        />
      )}
      {type === 'customers' && (
        <Rate
          yesterday_value={storeData.yesterdayCustomers}
          today_value={storeData.todayCustomers}
        />
      )}
    </div>
  );
};

const Rate = ({ yesterday_value, today_value }) => {
  const calculateRate = () => {
    if (yesterday_value === 0 && today_value === 0) return 0;
    let change = today_value - yesterday_value;
    var rate = change / yesterday_value;
    return rate * 100;
  };

  return (
    <div className='flex w-full'>
      <img
        src={today_value > yesterday_value ? up_trend : down_trend}
        alt=''
        className='w-3 mr-1 h-3 my-auto'
      />
      <p
        className={`text-sm
          ${
            today_value > yesterday_value
              ? 'text-green-500 w-full font-bold'
              : 'text-red-400 font-bold'
          }
        `}
      >
        {`${calculateRate()}% from yesterday`}
      </p>
    </div>
  );
};

// const Children = ({ id, productName, sales, price, stock, status }) => {
//   return (
//     <div className='flex justify-between'>
//       <div className='flex justify-between w-full sticky'>
//         <p className={`${styles.valueStyle} sticky`}>{id}</p>
//         <p className={`${styles.valueStyle} sticky `}>{productName}</p>
//         <p className={`${styles.valueStyle} sticky `}>{sales}</p>
//         <p className={`${styles.valueStyle} sticky ml-12`}>{price}</p>
//         <p className={`${styles.valueStyle} sticky `}>{stock}</p>
//         <Status value={status} />
//       </div>
//     </div>
//   );
// };

// const Status = ({ value }) => {
//   if (value === 'In Stock') {
//     return (
//       <div className='rounded text-green-800 bg-green-100 text-xs px-6 py-1'>
//         {value}
//       </div>
//     );
//   }

//   return (
//     <div className='rounded text-red-800 bg-red-100 text-xs px-3 py-1'>
//       {value}
//     </div>
//   );
// };

const Total = ({ image, type, number }) => {
  return (
    <div className='flex items-center bg-white shadow-lg w-full rounded-lg px-4 py-6 mx-1 lg:w-1/3 mb-3 gap-3'>
      <div className='rounded-full bg-blue-100 w-[32px] h-[32px] flex justify-center items-center'>
        <img src={image} alt='' className=' w-4 h-4 mx-auto' />
      </div>

      <div>
        <p className='text-sm opacity-50'>{`Total ${type}`}</p>
        <p
          className={
            type === 'sales' ? 'hidden' : 'font- text-brand-black text-xl'
          }
        >
          {number}
        </p>

        <div className={type === 'sales' ? 'flex' : 'hidden invisible'}>
          <img src={naira} alt='' className='w-4 h-4 my-auto' />
          <p className='font text-brand-black text-xl font-Nunito'>{number}</p>
        </div>
      </div>
    </div>
  );
};

export default MyStore;
