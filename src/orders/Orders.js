



const Orders = () => {
    let navigate = useNavigate();
    const [loading , setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!config.token) {
            navigate('/login');
        } else {
            fetch('http://127.0.0.1:3000/orders/order', {
                headers: {Accept: 'application/json', 'x-access-token': config.token},
            })
            .then((response) => response.json())
            .then((response) => {
                setLoading(false);
                setOrders(response);
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
        }
        return () => setOrders([]);
    }, []);

    return (
        <div className="orders">
            {loading ? (
                <p>Loading...</p>
            ) : (
                orders.map((order) => (
                    <div key={product._id}>
                        <h2>{product.titulo}</h2>
                        <p>Em Stock: {product.stock}</p>
                       {product.preço} € 
                       <p>{product.descrição} </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Orders;