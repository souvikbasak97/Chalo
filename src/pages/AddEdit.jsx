import React,{useState,useEffect} from 'react'
import {useHistory,useParams} from 'react-router-dom'
import fireDb from "../firebase"
import {ToastContainer,toast} from 'react-toastify';

export const AddEdit = ()=> {
  const initialState={
    number:0,
    routename:"",
    routedirec: false,
    routeid:"",
    lat:"",
    lng:""
  };

  const {id}=useParams();
  const [state,setState]=useState(initialState);
  const [data,setData]=useState({});
  const {number,routename,routedirec,routeid,lat,lng}=state;

  useEffect(()=>{
    fireDb.child("routes").on("value", (snapshot)=>{
        if(snapshot.val()!==null){
            setData({...snapshot.val()});
        }
        else
            setData({});
    });
    return()=>{
        setData({});
    };
  },[id]);
  
  useEffect(()=>{
    if(id){
      setState({...data[id]});
    }
    else{
      setState({...initialState});
    }
    return ()=>{
      setState({...initialState});
    }
  },[id,data]);
  
  const handleInputChange = (e)=>{
    const {name,value}=e.target;
    setState({...state,[name]:value});
  };
  
  const handleInput=(e)=>{
    e.preventDefault();
    if(!routename||!routeid||!lat||!lng)
    {
        alert("Please provide value in each input field");
    }
    else{
        if(!id){
        fireDb.child("routes").push(state,(err)=>{
            if(err)
                alert(err);
            else
                alert("Route added successfully"); 
        })
        }
        else{
          fireDb.child(`routes/${id}`).set(state,(err)=>{
            if(err)
                alert(err);
            else
                alert("Route updated successfully"); 
        })
      }
    }
  };
  
    return(
    <div className='container'>
      <div className='crud shadow-lg p-3 mb-5 mt-5 bg-body rounded'>
        <div classname="row">
      <form>
                <div className="form-group">
                    <label>Enter Route Name</label>
                    <input type="name" className="form-control" name="routename" value={routename||""}
                     placeholder="Enter Routename" onChange={handleInputChange}/>
                </div>
                <div className="form-group mt-3">
                    <label value="">Choose RouteDirection(Up/Down) </label>
                    <input type="text" name="routedirec" className="form-control" value={routedirec} onChange={handleInputChange}/>
                </div>
                <div className="form-group mt-3">
                    <label>Enter Route Id</label>
                    <input type="text" className="form-control" name="routeid" placeholder="Enter Route Id" value={routeid||""} onChange={handleInputChange}/>
                </div>
                <div className="form-group mt-3">
                    <label>Enter Latitude separated by ','</label>
                    <input type="text" className="form-control" name="lat" placeholder="Enter Latitude" value={lat||""} onChange={handleInputChange}/>
                </div>
                <div className="form-group mt-3">
                    <label>Enter Longitude separated by ','</label>
                    <input type="text" className="form-control" name="lng" placeholder="Enter Longitude" value={lng||""} onChange={handleInputChange}/>
                </div>
                <br/>
                <input type="submit" onClick={handleInput} value={id?"Update":"Save"}></input>
            </form>
            </div>
            </div>
    </div>
    );
}