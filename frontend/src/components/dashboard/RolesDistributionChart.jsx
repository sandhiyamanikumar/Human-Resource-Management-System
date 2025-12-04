import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchRolesDistribution } from "../../api/dashboardService.api";
import { Spinner } from "react-bootstrap";

const COLORS = ["#0d6efd", "#6f42c1", "#198754", "#fd7e14", "#dc3545"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { role, count } = payload[0].payload;
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          padding: "8px",
          borderRadius: "4px",
        }}
      >
        <strong>{role}</strong>: {count} employees
      </div>
    );
  }
  return null;
};

const RolesDistributionChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchRolesDistribution();
      const formatted = res.data.map((d) => ({ role: d._id, count: d.count }));
      setData(formatted);
    };
    loadData();
  }, []);

  if (!data) return <Spinner animation="border" />;

  return (
    <div>
      <h6 className="mb-2 ms-sm-5 ps-sm-5">Roles Distribution</h6>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="role"
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
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RolesDistributionChart;
