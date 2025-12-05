import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "../../api/axiosInstance";

const COLORS = ["#0d6efd", "#198754", "#dc3545", "#ffc107", "#6f42c1"];

const EmployeeDepartmentChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(
        "/api/dashboard/employees/department-distribution"
      );
      setData(res.data.map((d) => ({ name: d._id, value: d.count })));
    };
    fetchData();
  }, []);

  return (
    <div>
      <h6 className="mb-2 ms-sm-5 ps-sm-5">Employee Department Distribution</h6>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeDepartmentChart;
