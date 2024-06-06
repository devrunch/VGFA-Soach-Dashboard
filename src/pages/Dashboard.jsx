/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import AreaGraph from "../components/AreaChartComponent";
import BarGraph from "../components/BarChartComponent";
import LineGraph from "../components/LineChartComponent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/Frame 15.png";
import image2 from "../assets/Frame 16.png";
import image3 from "../assets/Frame 17.png";
import checkbox from "../assets/Component 3.svg";
const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + localStorage.getItem('vgfatoken'));
const baseUrl = "http://vgfa-env-1.eba-brkixzb4.ap-south-1.elasticbeanstalk.com/api/";
function Dashboard() {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);
  const [email, setEmail] = useState("");
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => { checkLogin(); fetchData(); }, []);
  const checkLogin = async () => {
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    const response = await fetch(baseUrl + "auth/official/me", requestOptions);
    if (response.status === 401) navigate("/login");
    const res = await response.json();
    console.log(res)
    setEmail(res.message.email);
  }
  const fetchData = async () => {
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    const response = await fetch(baseUrl + "forms/all", requestOptions);
    const res = await response.json();
    if (response.status === 401) navigate("/login");
    console.log(res.forms)
    setData(res.forms);
  }

  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar setExpand={setSideMenuIsExpand} email={email} />
      <div
        className={`flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out ${sideMenuIsExpand ? "md:ml-72" : "md:ml-20"
          }`}
      >
        <Navbar />
        <div className="bg-[#FEFAF6]">
          <div className="container mx-auto px-4 py-6 ">
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mb-8">Welcome to your dashboard</p>
            <div className="flex flex-nowrap justify-around w-full max-w-[1400px] hidden">
              <GridItem title="Sales">
                {/* <AreaGraph /> */}
                {/* <img src={image1} alt="" className="aspect-video object-contain" /> */}
                <h1 className="text-3xl mb-5">Total Forms Listed</h1>
                <h1 className="text-6xl font-bold">{data?data.length : '-'}</h1>
              </GridItem>

              <GridItem title="Listings">
                {/* <BarGraph /> */}
                <img src={image2} alt="" className="aspect-video object-contain" />

              </GridItem>

              <GridItem title="VGFA">
                {/* <LineGraph /> */}
                <img src={image3} alt="" className="aspect-video object-contain" />
              </GridItem>
              <GridItem title="Sales">
                {/* <AreaGraph /> */}
                <img src={image1} alt="" className="aspect-video object-contain" />
              </GridItem>
            </div>
            {
              data && data.length ? (
                <div className="flex w-full justify-between">
                  <Table data={data} fetchData={fetchData} />
                  <ListComponent />
                </div>
              ) : (<div className="flex justify-center items-center h-[200px]">  <h1 className="text-2xl text-gray-600">No data available</h1></div>)
            }
          </div>
        </div>
        {/* <ListComponent /> */}
      </div>
    </div>
  );
}
function GridItem({ title, children }) {
  return (
    <div className="my-8 flex flex-col items-center justify-center border shadow-md border-slate-200 bg-white rounded-xl h-[200px] w-[24%]  overflow-hidden">
      {/* <h1 className=" ml-10 p-2 self-start text-gray-600">{title}</h1> */}
      {children}
    </div>
  );
}

function ListComponent({ title, children }) {
  return (
    <>
      <div className="bg-white  overflow-hidden shadow-xl transform transition-all w-[23%]">
        <div className='text-1xl font-bold text-center py-2 or-gradient2 text-gray-100 '>
          CHECKLIST
        </div>
        <div className="flex gap-x-3 px-2 my-2 items-center justify-between">
          <img src={checkbox} alt="" />
          <div>
            <h2 className="font-bold">Verify the VFGA units </h2>
            <p>check the total amount of VFGA units farmer have its capacity.... </p>
          </div>
        </div>
        <div className="flex gap-x-3 px-2 my-2 items-center justify-between">
          <img src={checkbox} alt="" />
          <div>
            <h2 className="font-bold">Verify the VFGA units </h2>
            <p>check the total amount of VFGA units farmer have its capacity.... </p>
          </div>
        </div>
        <div className="flex gap-x-3 px-2 my-2 items-center justify-between">
          <img src={checkbox} alt="" />
          <div>
            <h2 className="font-bold">Verify the VFGA units </h2>
            <p>check the total amount of VFGA units farmer have its capacity.... </p>
          </div>
        </div>
        <div className="flex gap-x-3 px-2 my-2 items-center justify-between">
          <img src={checkbox} alt="" />
          <div>
            <h2 className="font-bold">Verify the VFGA units </h2>
            <p>check the total amount of VFGA units farmer have its capacity.... </p>
          </div>
        </div>


      </div>
    </>
  );
}
export default Dashboard;
