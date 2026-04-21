import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Items } from "../pages/home";

type Props = {
  items: Items;
}

export const Chart = ({ items }: Props) => {

  const data = items.reduce((CategoryGroup: Record<string, number>, item) => {
    const amount = parseFloat(item.amount);

    if (CategoryGroup[item.category]) {
      CategoryGroup[item.category] += amount;
    } else {
      CategoryGroup[item.category] = amount;
    }

    return CategoryGroup;
  }, {});


  const grouped = Object.entries(data).map(([category, total]) => ({
    category,
    total,
  }));

  return (
    <ResponsiveContainer
      height={300}
      width="100%"
      style={{ marginTop: 16}}
    >
      <BarChart
        accessibilityLayer
        barCategoryGap="10%"
        barGap={4}
        data={grouped}
        height={300}
        layout="horizontal"
        margin={{
          bottom: 5,
          left: 20,
          right: 30,
          top: 20
        }}
        stackOffset="none"
        syncMethod="index"
        throttleDelay="raf"
        width={500}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Bar
          dataKey="total"
          fill="#85e98a"
        />
        <Tooltip
          defaultIndex={1}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}