"use client"

import { useState } from "react";
import RecentScore from "./components/RecentScore";
import Reward from "./components/Reward";
import Score from "./components/Score";
import Validate from "./components/Validate";
import { Eye, EyeOff } from "lucide-react";

export default function Home() {
  const mm = "9,37,60,117,128,129,187,188,216,249,241,245,247"
  const days = [1, 2, 3, 4]
  const [selectedDay, setSelectedDay] = useState(1)
  const miners = mm?.split(",").map((miner: string) => parseInt(miner.trim(), 10)).filter((miner: number) => !isNaN(miner))
  const [graph, setGraph] = useState(false)
  return (
    <div className="mx-5 md:mx-10 flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 py-2 px-4 bg-transparent border border-white w-fit rounded-xl cursor-pointer hover:bg-slate-500" onClick={() => setGraph(!graph)}>{!graph ? <Eye /> : <EyeOff />}Graph</div>
        {graph && <div className="flex flex-row gap-2 items-center">
          Period: 
          <select
            className="bg-gray-800 border-white border rounded-lg py-2 px-6 text-white"
            value={selectedDay}
            onChange={(e) => setSelectedDay(parseInt(e.target.value, 10))}>
            {
              days.map((day, index) => (
                <option key={index} value={day} className="bg-transparent">
                  {day}
                </option>
              ))}
          </select>
        </div>}
      </div>
      {!graph ? <div className="flex flex-row gap-10 w-full">
        <Validate miners={miners} />
        <Score miners={miners} />
        <Reward miners={miners} />
      </div> :
        <div className="flex w-full">
          <RecentScore selectedDay={selectedDay} mm={mm}/>
        </div>}
    </div >
  );
}
