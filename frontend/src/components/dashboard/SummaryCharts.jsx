import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import {
  fetchEmployeeStats,
  fetchLeaveStats,
} from "../../api/dashboardService.api";
import { Spinner } from "react-bootstrap";

const COLORS = ["#0d6efd", "#198754", "#dc3545", "#ffc107", "#6f42c1"];

const SummaryCharts = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [empRes, leaveRes] = await Promise.all([
          fetchEmployeeStats(),
          fetchLeaveStats(),
        ]);

        const chartData = [
          { name: "Total Employees", value: empRes.data.totalEmployees },
          { name: "Active Employees", value: empRes.data.activeEmployees },
          { name: "Pending Employees", value: empRes.data.pendingEmployees },
          { name: "Leaves Pending", value: leaveRes.data.pending },
          { name: "Leaves Approved", value: leaveRes.data.approved },
        ];

        setData(chartData);
      } catch (error) {
        console.error("Error fetching summary chart data:", error);
      }
    };

    loadData();
  }, []);

  if (!data)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <div>
      <h6 className="mb-2">Summary Bar Chart</h6>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 60 }} 
        >
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, angle: -30, textAnchor: "end" }} // rotate long labels
            interval={0} // show all labels
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SummaryCharts;
