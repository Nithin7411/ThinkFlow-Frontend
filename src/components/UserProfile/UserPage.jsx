import Navbar from '../Navbar/Navbar.jsx'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fetchApi from '../script/fetchApi.js';
import PageBody from './PageBody.jsx';
import './style.css';

const UserPage = () => {
  const { id } = useParams();
  const [AuthorData, setAuthorData] = useState([]);
  useEffect (() => {
    try{
      const getAuthorData = async () => {
      const data = await fetchApi('http://localhost:8000/user/profile/' + id);
      setAuthorData(data);
      }
      getAuthorData();
    }
    catch(error){
      console.error(error);
    }
  }, [id])
  return (
    <>
      <Navbar />
      <PageBody AuthorData={AuthorData} />
    </>
  );
};

export default UserPage;
