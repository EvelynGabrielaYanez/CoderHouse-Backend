const style = {
  bubbleAlert: {
    backgroundColor: '#E9725A',
    borderRadius: '15px',
    color: '#fff',
    padding: '2px 10px',
    fonrSize: '0.9rem',
    width: '20px'
  }
}

const BubbleAlert = ({ value }) => {
  const getQty = (qty) => {
    if(!qty) return '';
    return qty > 9 ? '9+' : qty;
  }
  return (
    <span style={style.bubbleAlert}>
      {getQty(value)}
    </span>
  )
}

export default BubbleAlert;