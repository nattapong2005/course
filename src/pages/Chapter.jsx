import React from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Chapter = () => {

  const params = useParams();
  const id = params.id;
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  const callApi = async () => {

    const res = await axios.get(
      "https://api.codingthailand.com/api/course/" + id
    );

    const data_format = await res.data.data;
    let result = data_format['length'];
    if(result == 0) {
      setText("ไม่พบข้อมูลในหลักสูตร");
    }else {
      setData(data_format);
    }

  };

  useEffect(() => {
    //call api เมื่อมีการเปิด component ครั้งแรก
    callApi();
  }, []);

  return (
    <>
    <div className="container mx-auto p-5">
      <div className="flex justify-between items-center mt-10 mb-5">
        <h1 className="text-3xl font-bold text-white"><i class="fa-brands fa-youtube"></i> เนื้อหาในหลักสูตร</h1>
        <NavLink to={"/"} ><div className="bg-white p-2 font-bold rounded-xl"><i class="fa-solid fa-arrow-left"></i> ย้อนกลับ</div></NavLink>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10">
          {
            data.map((d) => (
              <ChapterCard key={d.ch_id} title={d.ch_title} url={d.ch_url} view={d.ch_view} timetotal={d.ch_timetotal} />
            ))
          }
        </div>
      </div>
      
      <p className="text-xl font-bold text-red-800">{text}</p>
    </div>
    </>
  );
};

const ChapterCard = (props) => {
  return (
        <div className="card max-w-sm shadow-2xl bg-slate-800 rounded-xl cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105  duration-300">
        <div className="p-6 text-white">
          <div className="font-bold text-xl">{props.title}</div>
          <iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${props.url}`}></iframe>
          <div className="flex justify-between mt-5">
            <div><i class="fa-solid fa-eye"></i> {props.view}</div>
            <div><i class="fa-solid fa-clock"></i> {props.timetotal}</div>
          </div>
        </div>
      </div>
  );
}
export default Chapter;