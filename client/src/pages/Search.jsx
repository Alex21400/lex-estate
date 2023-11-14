import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingCard from '../components/ListingCard'

const initialState = {
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc'
  }

const Search = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);

  console.log(listings);

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

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
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

    if(
        searchTermFromURL || 
        typeFromURL || 
        parkingFromURL ||
        furnishedFromURL || 
        offerFromURL ||
        sortFromURL ||
        orderFromURL 
    ) {
        setFormData({
            searchTerm: searchTermFromURL || '',
            type: typeFromURL || 'all',
            parking: parkingFromURL === 'true' ? true : false,
            furnished: furnishedFromURL === 'true' ? true : false,
            offer: offerFromURL === 'true' ? true : false,
            sort: sortFromURL || 'createdAt',
            order: orderFromURL || 'desc'
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

    if(res.ok) {
        if(data.length < 9) {
            setShowMore(false);
        }

        setListings([...listings, data]);
    }
  }

  return (
    <main className='flex flex-col'>
        <div className='p-4'>
            <form onSubmit={handleSubmit} className='w-full sm:max-w-sm mx-auto border-slate-200 border-2 p-4 rounded-lg'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap'>Search Term:</label>
                    <input 
                    type="text" 
                    id='searchTerm' 
                    placeholder='Search...'
                    className='border rounded-lg p-2 w-full' 
                    value={formData.searchTerm}
                    onChange={handleChange}/>
                </div>
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
                </div>
                <div className='flex items-center gap-2 mt-3'>
                    <label>Sort:</label>
                    <select id="sort_order" className='border p-2 rounded-lg text-sm sm:text-md' onChange={handleChange} defaultValue={'createdAt_desc'}>
                        <option value='regularPrice_desc' className='text-sm  sm:text-md'>Price -- Highest to lowest</option>
                        <option value='regularPrice_asc' className='text-sm  sm:text-md'>Price -- Lowest to highest</option>
                        <option value='createdAt_desc' className='text-sm  sm:text-md'>Date -- Latest</option>
                        <option value='createdAt_asc' className='text-sm  sm:text-md'>Date -- Oldest</option>
                    </select>
                    
                </div>
                <button 
                    className='bg-slate-600 text-white font-medium px-4 py-2 mt-3 w-full rounded-lg'
                    type='submit'>
                        Search
                    </button>
            </form>
        </div>
        <div>
            <h2 className='text-slate-600 text-2xl lg:text-3xl font-medium  text-center my-6'>Listing Results:</h2>

            <div className='flex flex-wrap gap-4 px-12 mt-6'>
                {!loading && listings.length === 0 && (
                    <p className='text-xl text-slate-600 my-4 text-center'>No listings found! Try to search for something else.</p>
                )}

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
    </main>
  )
}

export default Search