import React from 'react';
import { Link } from 'react-router-dom';
import { IoPerson, IoPricetag, IoBook, IoInformationCircle } from 'react-icons/io5';
import moment from 'moment';

const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 w-full">
      <Link to={`/resource/${listing._id}`} className="block group">
        <div className="relative h-60 overflow-hidden">
          <img
            src={listing.imageUrls[0] || 
              'https://via.placeholder.com/400x250?text=No+Image'}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-50" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-semibold leading-snug truncate w-56">
              {listing.title}
            </h3>
            <p className="flex items-center text-sm">
              <IoPerson className="mr-1 text-green-300" /> {listing.author}
            </p>
          </div>
        </div>
        <div className="p-4 flex flex-col justify-between h-56">
          <p className="text-gray-700 text-sm line-clamp-3 mb-4">
            {listing.description || 'No description available.'}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-green-700 font-semibold">
              <IoPricetag className="mr-1" />
              ${listing.offer
                ? listing.discountPrice.toLocaleString()
                : listing.regularPrice.toLocaleString()}
            </div>
            <div className="flex items-center text-gray-500 text-xs">
              <IoInformationCircle className="mr-1" />
              {moment(listing.createdAt).fromNow()}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
