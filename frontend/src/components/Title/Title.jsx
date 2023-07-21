const styles = {
  title: {
    marginBottom: '30px'
  }
}
const Title = ({ children, ...props }) => {
  return (
    <h1 style={styles.title} {...props}>
      {children}
    </h1>
  )
}

export default Title;