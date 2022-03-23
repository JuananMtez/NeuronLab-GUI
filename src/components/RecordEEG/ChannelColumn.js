const ChannelColumn = ({name, status}) => {
  if (status)
    return (<h3 style={{color:'green', fontWeight:'bold', fontSize:'16px'}}>{name}</h3>)

  return (<p style={{color:'red', fontWeight:'bold'}}>{name}</p>)
}
export default ChannelColumn