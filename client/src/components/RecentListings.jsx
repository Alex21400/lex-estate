import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SmallCard from "./SmallCard";

const RecentListings = () => {
  const [recentListings, setRecentListings] = useState([]);

  // Fetch most recent listings on page load
  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        const res = await fetch('/api/listings?sort=createdAt&order=desc&limit=4');
        const data = await res.json();
  
        if(res.ok) {
          setRecentListings(data);
        }
      } catch(error) {
        console.log(error);
      }
    } 

    fetchRecentListings();
  }, []);

  return (
    <div className='p-6'>
        <div className='max-w-7xl mx-auto p-3 my-10'>
          {recentListings && recentListings.length > 0 && (
            <div className="flex flex-col items-center lg:items-start">
              <h3 className='text-2xl text-white-200 font-medium mb-1'>Recent Offers</h3>
              <Link to={`/search`} className='hover:underline text-blue-500'>
                Show More
              </Link>
              <div className='flex flex-wrap mt-5 justify-center lg:justify-normal gap-6'>
                {recentListings.map(listing => {
                  return (
                    <SmallCard listing={listing} key={listing._id}/>
                  )
                })}
              </div>
            </div>
          )}
        </div>
    </div>
  )
}

export default RecentListings