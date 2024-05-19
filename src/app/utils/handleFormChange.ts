const handleChange = (e: any, fn: any) => {
  fn((prev: any) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      return { ...prev, [name]: files[0] }
    } else {
      return { ...prev, [name]: value }
    }
  })
}

export default handleChange