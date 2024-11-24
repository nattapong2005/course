import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Course = () => {
  // ยิง api ไป get chapter ยังไง?
  const [data, setData] = useState([]);
  const callApi = async () => {
    const res = await axios.get(
      "https://api.codingthailand.com/api/course"
    );
    const data_format = await res.data.data;
    // เก็บข้อมูลที่อ่านได้ใส่ State
    setData(data_format);
  };
  useEffect(() => {
    //call api เมื่อมีการเปิด component ครั้งแรก
    callApi();
  }, []);
  return (
    <>
    <div className="container mx-auto p-5 ">
    <h1 className="text-3xl font-bold text-white mt-10 mb-3"><i class="fa-solid fa-book"></i> หลักสูตร <span>นักพัฒนาเว็บไซต์</span></h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10">
    {
      data.map( (d) =>(
        <CourseCard id={d.id} picture={d.picture} title={d.title} detail={d.detail} date={d.date} view={d.view} />
      ) )
    }
    </div>

    </div>
    </>
  );
};

const CourseCard = (props) => {
  return (
    <NavLink to={"/course/" + props.id}  >
        <div className="card max-w-sm h-full shadow-2xl bg-slate-800 rounded-xl cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105  duration-300">
        <div>
          <img className="w-full h-48 rounded-t-xl" src={props.picture}/>
        </div>
        <div className="p-6 text-white">
          <div className="font-bold text-xl text-[#7A1CAC]">{props.title}</div>
          <div>{props.detail}</div>
          <div className="flex justify-between">
          <div><i class="fa-solid fa-calendar-days"></i> {props.date}</div>
          <div><i class="fa-solid fa-eye"></i> {props.view}</div>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
export default Course;  