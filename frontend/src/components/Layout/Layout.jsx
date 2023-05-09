const styles = {
  layout: {
    backgroundColor: '#fff',
    color: '#0A283E',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    width: '1200px'
  }
}
const Layout = ({ children }) => {
  return (
    <div style= {styles.layout}>
      <div style= {styles.container}>
        {children}
      </div>
    </div>
  );
}

export default Layout;