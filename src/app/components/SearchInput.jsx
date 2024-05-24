'use client';

import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const search = (e) => {
    e.preventDefault();
    const URIEncodedSearchQuery = encodeURI(searchQuery || "") 
    router.push(`/home?q=${URIEncodedSearchQuery}`)
  }

  return (
    <form className='w-full flex justify-center' onSubmit={search}>
      <input className='border border-accent px-5 py-2 rounded-full bg-gray-200 w-2/3' value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)}} placeholder='Kolkata...'/>
    </form>
  )
}

export default SearchInput