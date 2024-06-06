/* eslint-disable react/prop-types */
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from 'recharts';
  
  const productSales = [
    {
      name: 'Jan',
      product1: 4000,
      product2: 2400,
    },
    {
      name: 'Feb',
      product1: 3000,
      product2: 2210,
    },
    {
      name: 'Mar',
      product1: 2000,
      product2: 2290,
    },
    {
      name: 'Apr',
      product1: 2780,
      product2: 2000,
    },
    {
      name: 'May',
      product1: 1890,
      product2: 2181,
    },
    {
      name: 'Jun',
      product1: 2390,
      product2: 2500,
    },
  ];
  
  const AreaChartComponent = () => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={productSales}
          margin={{ right: 30 }}
        >
          <YAxis />
          <XAxis dataKey="name" />
          <CartesianGrid strokeDasharray="5 5" />
  
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend /> */}
  
          <Area
            type="monotone"
            dataKey="product1"
            stroke="#fcae44"
            fill="#f15020"
            stackId="1"
          />
  
          <Area
            type="monotone"
            dataKey="product2"
            stroke="#f15020"
            fill="#fcae44"
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-slate-100 shadow-md flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-[#f15020]">
          Revenue:
          <span className="ml-2">${payload[0].value}</span>
        </p>
        <p className="text-sm text-[#fcae44]">
          Profit:
          <span className="ml-2">${payload[1].value}</span>
        </p>
      </div>
      );
    }
  };
  
  export default AreaChartComponent;