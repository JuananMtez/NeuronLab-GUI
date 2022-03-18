
import { Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react"
import ChannelsEnum from '../ChannelsEnum';
import TableStandard from '../Table/TableStandard';
import ChannelColumn from './ChannelColumn';
import ChartEEG from "./ChartEEG";

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
};

const getColor = (i) => {



  switch(i) {
    case '0':
      return '#f15e3e'
    case '1':
      return '#f1c33e' 
    case '2':
      return '#e6ee3f'
    case '3':
      return '#6cee3f'
    case '4':
      return '#3feede'
    case '5':
      return '#3f44ee'
    case '6':
      return '#d13fee'
     default:
       return '#ee3fb1'
  }
}

const initArray = () => {
  let volts = []
  for (let i = 0; i < 8; i++) {
      let channel = Array(250*5).fill({pv:0})
      volts.push(channel)
  }
  return volts
}
const TableEEG = ({ device, play, pair}) => {
  const [items, setItems] = useState(initArray)
  const [id, setId] = useState(0)


  useEffect(() => {
    if(!play) {
      if (id > 0)
        clearInterval(id);
      if (!pair)
        setItems(initArray)
      return;
    }
  
    const newIntervalId = setInterval(() => {
      setItems(window.lsl.getVolts());
    }, 0);

    setId(newIntervalId);

  }, [play])



  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'channel',
        hideHeader: false,
        Cell: ({ row }) => {
          return (
            <ChannelColumn name={ChannelsEnum[device.channels[row.id].channel-1].name} status={true} />
          )
        }
      },
      {
        Header: () => null,
        id: 'chart',       
        hideHeader: false,


        Cell: ({ row }) => {
          return (<ChartEEG items={items[row.id]} color={getColor(row.id)}/>)
      }
      }
    ], [device, items])

   

    const data = useMemo (
      () => {
         return device.channels
        .sort((a, b) => { return a.position - b.position })
        .map((e, index)=> (
          {}
        ))


      }, [device])


  return (
    
    <TableStandard  columns={columns} data={data}/>

    
  )
}

export default TableEEG