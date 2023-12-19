import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { HiSearch } from 'react-icons/hi';
import { VscSettings } from "react-icons/vsc";
import Spinner from '../components/Spinner';

const initialState = {
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
    minPrice: 0,
    maxPrice: 1000000000
}

const Listings = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const [filterOpen, setFilterOpen] = useState(false);

  const navigate = useNavigate();

  // Handle search
  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', formData.searchTerm);
    urlParams.set('type', formData.type);
    urlParams.set('parking', formData.parking);
    urlParams.set('furnished', formData.furnished);
    urlParams.set('offer', formData.offer);
    urlParams.set('sort', formData.sort);
    urlParams.set('order', formData.order);
    urlParams.set('minPrice', formData.minPrice);
    urlParams.set('maxPrice', formData.maxPrice);

    const searchQuery = urlParams.toString();

    navigate(`/listings?${searchQuery}`);
  }

  // If url changes set formData according to urlParams
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const searchTermFromURL = urlParams.get('searchTerm');
    const typeFromURL = urlParams.get('type');
    const parkingFromURL = urlParams.get('parking');
    const furnishedFromURL = urlParams.get('furnished');
    const offerFromURL = urlParams.get('offer');
    const sortFromURL = urlParams.get('sort');
    const orderFromURL = urlParams.get('order');
    const minPriceFromURL = urlParams.get('minPrice');
    const maxPriceFromURL = urlParams.get('maxPrice');

    if(
        searchTermFromURL || 
        typeFromURL || 
        parkingFromURL ||
        furnishedFromURL || 
        offerFromURL ||
        sortFromURL ||
        orderFromURL ||
        minPriceFromURL || 
        maxPriceFromURL
    ) {
        setFormData({
            searchTerm: searchTermFromURL || '',
            type: typeFromURL || 'all',
            parking: parkingFromURL === 'true' ? true : false,
            furnished: furnishedFromURL === 'true' ? true : false,
            offer: offerFromURL === 'true' ? true : false,
            sort: sortFromURL || 'createdAt',
            order: orderFromURL || 'desc',
            minPrice: minPriceFromURL || 0,
            maxPrice: maxPriceFromURL || 1000000000
        });
    }

    const fetchListings = async () => {
        try {
            setLoading(true);
            setShowMore(false);

            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listings?${searchQuery}`);
            const data = await res.json();
    
            if(res.ok) {
                setLoading(false);
                setListings(data);
                
                if(data.length > 8) {
                    setShowMore(true);
                } else {
                    setShowMore(false);
                }
            }
        } catch(error) {
            setLoading(false);
            setError(error.message);
        }
    }

    fetchListings();
  }, [location.search]);

  // Handle input change
  const handleChange = (e) => {
    const { id, value, checked } = e.target;

    if(id === 'all' || id === 'rent' || id === 'sale') {
        setFormData({ ...formData, type: id });
    }

    if(id === 'searchTerm') {
        setFormData({ ...formData, searchTerm: value });
    }

    if(id === 'minPrice' || id === 'maxPrice') {
        setFormData({ ...formData, [id]: parseInt(value) });
    }

    if(id === 'parking' || id === 'furnished' || id === 'offer') {
        setFormData({ ...formData, [id]: checked || checked === 'true' ? true : false });
    }

    if(id === 'sort_order') {
        const sort = value.split('_')[0] || 'created_at';
        const order = value.split('_')[1] || 'desc';

        setFormData({ ...formData, sort, order });
    }
  }
  

  // Show more button function
  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();

    const res = await fetch(`/api/listings?${searchQuery}`);
    const data = await res.json();

    if(data.length < 9) {
        setShowMore(false);
    }

    setListings([...listings, ...data]);
  }

  return (
    <div className='flex flex-col mt-20 mb-10 min-h-[80vh]'>
        <div className='mt-6 px-6'>
            <form onSubmit={handleSubmit} className='mx-auto max-w-xl'>
            <div className='w-full sm:max-w-sm mx-auto flex items-center border-slate-200 border-2 px-4 py-2 rounded-lg'>
                <button type='submit'>
                        <HiSearch size={22} className='mx-2'/>
                </button>
                <input 
                        type="text" 
                        id='searchTerm' 
                        placeholder='Search...'
                        className='rounded-lg p-2 w-full bg-transparent focus:outline-none' 
                        value={formData.searchTerm}
                        onChange={handleChange}/>
                <VscSettings size={24} className='cursor-pointer' onClick={() => setFilterOpen(!filterOpen)}/>   
            </div>

            {filterOpen && (
                <div className='w-full max-w-xl mx-auto p-4 border-slate-200 border-2 mt-3 rounded-lg'>
                    <div className='flex flex-wrap items-center gap-2 mt-3'>
                        <label>Type:</label>
                        <div className='flex items-center gap-1'>
                            <input type="checkbox" id='all' className='w-5' onChange={handleChange} checked={formData.type === 'all'}/>
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <input type="checkbox" id='rent' className='w-5' onChange={handleChange} checked={formData.type === 'rent'} />
                            <span>Rent</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <input type="checkbox" id='sale' className='w-5' onChange={handleChange} checked={formData.type === 'sale'} />
                            <span>Sale</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <input type="checkbox" id='offer' className='w-5' onChange={handleChange} checked={formData.offer} />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap items-center gap-2 mt-3'>
                        <label>Amenities:</label>
                        <div className='flex items-center gap-1'>
                            <input type="checkbox" id='parking' className='w-5' onChange={handleChange} checked={formData.parking} />
                            <span>Parking</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <input type="checkbox" id='furnished' className='w-5' onChange={handleChange} checked={formData.furnished}/>
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                        <label>Sort:</label>
                        <select id="sort_order" className='border p-2 rounded-lg text-sm sm:text-md' onChange={handleChange} defaultValue={'createdAt_desc'}>
                            <option value='regularPrice_desc' className='text-sm  sm:text-md'>Price -- Highest to lowest</option>
                            <option value='regularPrice_asc' className='text-sm  sm:text-md'>Price -- Lowest to highest</option>
                            <option value='createdAt_desc' className='text-sm  sm:text-md'>Date -- Latest</option>
                            <option value='createdAt_asc' className='text-sm  sm:text-md'>Date -- Oldest</option>
                        </select>
                        </div>
                    </div>
                    <div className='flex flex-wrap items-center gap-2 mt-3'>
                        <div>
                            <span>Price from: </span>
                            <input type="number" id='minPrice' className='p-2 border border-gray-300 rounded-lg max-w-[100px]' onChange={handleChange}/> 
                        </div>
                        <div>
                            <span>to </span>
                            <input type="number" id='maxPrice' className='p-2 border border-gray-300 rounded-lg max-w-[100px]' onChange={handleChange}/>
                            <span className='font-semibold'> $</span>
                        </div>
                    </div>
                    
                </div>
            )}     
            </form>

        </div>

        <div className=''>
            <h2 className='text-white-200 text-2xl lg:text-3xl font-medium text-center my-6'>Listing Results:</h2>

            {!loading && listings.length === 0 && (
                <p className='text-xl text-slate-600 my-4 text-center'>No listings found! Try to search for something else.</p>
            )}

            <div className='flex flex-wrap gap-8 px-6 xl:px-20 mt-8 justify-center'>
                {loading && <Spinner />}          
                {!loading && listings.length > 0 && listings.map(listing => {
                    return (
                        <ListingCard key={listing._id} listing={listing} />
                    )
                })}

            </div>
        </div>
        {showMore && (
            <button onClick={() => onShowMoreClick()} className='bg-slate-500 text-white px-4 py-2 rounded-lg max-w-max mx-auto my-7 hover:opacity-90'>Show More</button>
        )}
    </div>
  )
}

export default Listings