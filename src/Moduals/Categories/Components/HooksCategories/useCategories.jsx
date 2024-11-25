/* eslint-disable no-unused-vars */
import React from 'react'
import useFetch from '../../../../hooks/useFetch'
import axios from 'axios';

let getCategorieslist = async () => {
    
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      return response;
  };
export default function useCategories() {
    const {data, error,isError, isLoading, trigger} = useFetch(getCategorieslist);
  
  
  return{
    Categories: data?.data,
    CategoriesError : error,
    isCategoriesError :isError,
    isLoadingCategories : isLoading,
    CategoriesTrigger: trigger,
  }
}
