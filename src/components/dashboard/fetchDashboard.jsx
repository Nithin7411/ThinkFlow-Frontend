import { useEffect, useState } from "react";
import fetchApi from '../script/fetchApi';

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchdashboard = async () => {
          try {
            const dashboard = await fetchApi(`http://localhost:8000/user/dashboard`);
            if (dashboard) {
              setData([dashboard]);
            } 
          } catch (error) {
            setError({error})
          }
    }
    fetchdashboard();
  }, []);
  return { data, error };
};

export default useFetchData;

