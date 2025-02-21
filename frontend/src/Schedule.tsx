import React, { useState, useEffect } from "react";
import axios from "axios";

interface ScheduleProps {
  token: string;
  setToken: (token: string | null) => void;
}
type TSchedule = {
  [key: string]: [string, string]; 
};

const Schedule: React.FC<ScheduleProps> = ({ token, setToken }) => {
  const [schedule, setSchedule] = useState<TSchedule>({});
  useEffect(() => {
    axios
      .get("http://localhost:5000/schedule", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSchedule(res.data))
      .catch((err) => {
        console.error("Ошибка загрузки расписания", err);
        if (err.response?.status === 403) {
          setToken(null); 
        }
      });
  }, [token, setToken]);

  const updateSchedule = () => {
    axios.post("http://localhost:5000/schedule",schedule, { headers: { Authorization: `Bearer ${token}` } }).then(() => alert("Сохранено!")).catch((err) => {
      if (err.response?.status === 403) {
        alert(err.response.data.message)
      }
    });;
  };

  const handleCloseSession = () => {
  localStorage.removeItem("token");
  setToken(null)
}

  return (
    <div className="m-3 w-50 m-auto">
      <h2 className="mt-5">Расписание</h2>
      {Object.entries(schedule).map(([day, times]) => (
        <div className="d-flex justify-content-between p-3 bg-secondary text-white border-bottom" key={day}>
          <div className="p-2">{day}</div>
          <div className="d-flex">
          <input
            type="text"
            className="p-1 "
            value={times[0]}
            onChange={(e) =>
              setSchedule({ ...schedule, [day]: [e.target.value, times[1]] })
            }
            />
          <input
            type="text"
            value={times[1]}
            onChange={(e) =>
              setSchedule({ ...schedule, [day]: [times[0], e.target.value] })
            }
          />
          </div>
        </div>
      ))} 
      <div className="m-3 d-flex justify-content-between w-25">
       <button type="submit" className="btn btn-primary" 
       onClick={updateSchedule}>Сохранить</button>
      <button  type="submit" className="btn btn-danger"
      onClick={handleCloseSession}>Выйти</button>
      </div>
    </div>
  );
};

export default Schedule;
