import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const User = () => {
  const [user, setUser] = useState<any>(null);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const queries = {
    name: searchParams.get("name"),
    age: searchParams.get("age"),
    hhh: searchParams.get("hhh"),
  };

  console.log("searchParams", queries);

  const fetchUser = async (id: string | undefined) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      setUser(response.data);
    } catch (err) {
      navigate(-1);
    }

    // axios
    //   .get(`https://jsonplaceholder.typicode.com/users/${id}`)
    //   .then((response: any) => {
    //     setUser(response.data);
    //   })
    //   .catch(() => {
    //     navigate(-1);
    //   });
  };

  useEffect(() => {
    fetchUser(params.id);
  }, [params]);

  return (
    <div>
      <p>User detail page</p>
      <Link to="/users">Back to user list</Link>
      <p>User name: {user?.name}</p>
    </div>
  );
};
