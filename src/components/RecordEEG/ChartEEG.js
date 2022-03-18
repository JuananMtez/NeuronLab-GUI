import { LineChart, Line, YAxis, XAxis} from 'recharts';


const ChartEEG = ({ items, color }) => {
  return (

    <LineChart 
      width={1200} 
      height={40} 
      data={items}
    >

      <Line type="monotone" dataKey="pv" isAnimationActive={false} stroke={color} dot={false}/>
    </LineChart>

  )
}

export default ChartEEG