import React,{useState,useEffect} from 'react';
import fireDb from '../firebase';
import {
    GoogleMap,
    LoadScript,
    Data,
    DrawingManager,
    Marker,
    Polyline
} from "@react-google-maps/api";


const containerStyle = {
    width: "80vh",
    height: "80vh",
};
const position={
  lat:38,
  lng:-115
}
const initialState={
  number:0,
  routename:"",
  routedirec: false,
  routeid:"",
  lat:"",
  lng:"",
  stat:false
};

const path=[];


function MapComponent(props) {
  
  const [state,setState]=useState(initialState);
  const [data,setData]=useState({});
  const {number,routename,routedirec,routeid,lat,lng,stat}=state;
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
  },[]);

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  Object.keys(data).map((id,index)=>{
    let lats=data[id].lat.split(',').map(parseFloat);
    let lngs=data[id].lng.split(',').map(parseFloat);
    console.log(lats);
    for(let i=0;i<lats.length;i++){
      path.push({lat:lats[i],lng:lngs[i]});
    }
  })

  const option={
    strokeColor: {},
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: getRandomColor(),
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: path,
    zIndex: 1}
  
  
    return (
      
        <LoadScript
            googleMapsApiKey="AIzaSyBJJQamgMV0wS6bnB5XvBZGtTRickTV0d8"
            libraries={["drawing"]}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{
                    lat: 38,
                    lng: -115,
                }}
                zoom={2}
            >
                {/* Child components, such as markers, info windows, etc. */}   
                {Object.keys(path).map((id,index)=>{
                    return(
                      <Marker icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"} position={path[id]}/>
                    )
                })}
                
              
              <Polyline path={path} options={option}/>
                
              
                  
                

            </GoogleMap>
            
        </LoadScript>
    );
}

export default React.memo(MapComponent);