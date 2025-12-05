import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer,Legend } from "recharts";
import { fetchLeaveStats } from "../../api/dashboardService.api";
import { Spinner } from "react-bootstrap";

const COLORS = ["#ffc107", "#198754", "#dc3545"]; // Pending, Approved, Rejected

const LeavesOverviewChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchLeaveStats();
      setData([
        { name: "Pending", value: res.data.pending },
        { name: "Approved", value: res.data.approved },
        { name: "Rejected", value: res.data.rejected },
      ]);
    };
    loadData();
  }, []);

  if (!data) return <Spinner animation="border" />;

  return (
    <div>
      <h6 className="mb-2 ms-sm-5 ps-sm-5">Leaves Overview</h6>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeavesOverviewChart;
