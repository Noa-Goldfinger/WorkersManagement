import { useDispatch } from "react-redux";
import { useEffect } from "react";
import SetEmployees from "../service/setEmployees";
import { useSelector } from "react-redux";
import Image from "../images/BANNER_HOMEPAGE_6_7.jpg"

export default function HomePage(){
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SetEmployees());
  }, []);
  return<>
  <h1 className="Home">HomePage</h1>
  <img src={Image} alt="bunner"></img>
  </>  
}