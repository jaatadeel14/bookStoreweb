import React from 'react'
import { useNavigate } from 'react-router-dom'

function Cards({ item }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/book/${item._id}`);
  };

  return (
    <>
      <div className='mt-4 my-3 p-3 cursor-pointer' onClick={handleCardClick}>
        <div className="card w-92 bg-base-200 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure className="h-48 overflow-hidden">
            <img
              src={item.image}
              alt={item.name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline">${item.price}</div>
              <div className="badge badge-outline hover:bg-pink-500 hover:text-white duration-200">Buy Now</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cards















