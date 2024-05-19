const handleChange = (e: { target: { name: string; value: string } }, fn: (arg0: (prev: any) => any) => void) => {
  const { name, value } = e.target;
  fn(prev => ({ ...prev, [name]: value }))
}

export default handleChange