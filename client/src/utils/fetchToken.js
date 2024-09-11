const fetchToken = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
      }, []);
    
    return (
    {}
  )
}

export default fetchToken;