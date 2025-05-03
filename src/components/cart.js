import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, itemAdd } from "../actions/ItemActions";
import { fetchIP } from '../actions/IPActions';
import { Link, useNavigate } from 'react-router-dom';
import { Image, Nav, Carousel, Table, Button, Form } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { submitOrder } from '../actions/OrderActions';

function Cart() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.item.items);
    const geo = useSelector(state => state.geo.data);
    const navigate = useNavigate();

    // Memoize the items array
    const memoizeditems = useMemo(() => {
        return items;
    }, [items]);
    const memoizedgeo = useMemo(() => {
      return geo;
  }, [geo]);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);
    useEffect(() => {
      fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => dispatch(fetchIP(data.ip)))
      .catch(err => console.error('Failed to fetch IP:', err));
    }, [dispatch]);

    const [details, setDetails] = useState({
      address: '',
      city: '',
      state: '',
      zip: ''
    });

    var msg = localStorage.getItem('msg');
    if (msg){
      msg = String(msg);
      localStorage.removeItem('msg')
      return <h4>{msg}</h4>;
    }

    var cart = localStorage.getItem('cart');
    if (!cart)
      return (<h4>There are no items in your cart.</h4>)
    cart = JSON.parse(cart);

    const updateDetails = (event) => {
          setDetails({
            ...details,
              [event.target.id]: event.target.value
          });
      };

    const RemoveItem = (item) => {
        const pos = cart.indexOf(item);
        cart.splice(pos, 1);
        if (cart.length > 0)
          localStorage.setItem('cart', JSON.stringify(cart));
        else
          localStorage.removeItem('cart');
        navigate('/cart');
    };
    // return <div>{JSON.stringify(items)}</div>
    if (!memoizeditems || !memoizedgeo) { // Use memoizedItems here
        return <div>Loading....</div>;
    }
    var items2 = {};
    var total = -1;
    try
    {
      for (const obj of memoizeditems)
        items2[obj._id] = obj;
      items2 = cart.map(id => items2[id]);
      var total = items2.reduce((accumulator, obj) => accumulator + Number(obj.price), 0);
    }
    catch {
      return <div>There was an error. Please Log Out then, Sign back In.</div>
    }
    
    const placeOrder = () => {
      var det = {...details};
      det.userid = localStorage.getItem('id');
      det.deny = memoizedgeo.deny !== false;
      det.msg = memoizedgeo.msg;
      det.total = total;
      det.items = items2.map(itm => {return {itemname: itm.name, price: itm.price}; });
      dispatch(submitOrder(det));
      localStorage.removeItem('cart');
      var m = 'Your order was succesfully submitted!';
      if (det.deny)
        m = `The order was denied because of the following reason: "${det.msg}"`;
      localStorage.setItem('msg', m);
      navigate('/cart');
    };

    return (
      <div>
        <h2>Cart</h2>
        <Table>
          {items2.map(itm => {
            return (
            <tr>
              <td><Image className="item-img" src={itm.imgurl}  alt={itm.name} /></td>
              <td><h3>{itm.name}</h3></td>
              <td>
                <h3>${itm.price}</h3>
                <button onClick={RemoveItem}>
                  REMOVE
                </button>
                </td>
            </tr>
          )})}
          <td></td><td></td>
          <td><h3><strong>Total: $</strong>{Math.round(total*100) / 100}</h3></td>
        </Table>
        <div>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Please tell us where to ship your item(s):</h2>
            <Form>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control onChange={updateDetails} value={details.address} maxLength={40} type="text" placeholder="Address" />
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control onChange={updateDetails} value={details.city} maxLength={40} type="text" placeholder="City" />
                </Form.Group>
                <Form.Group controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control onChange={updateDetails} value={details.state} maxLength={30} type="text" placeholder="Antarctica" />
                </Form.Group>
                <Form.Group controlId="zip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control onChange={updateDetails} value={details.zip} type="text" placeholder="10010" />
                </Form.Group>
                <Button onClick={placeOrder}>Place Order</Button>
            </Form>
            </div>
        </div>
      </div>
        // <Carousel onSelect={handleSelect} className="bg-dark text-light p-4 rounded">
        //   {memoizedMovies.map((movie) => (
        //     <Carousel.Item key={movie._id}>
        //       {/* Use Nav.Link with "as={Link}" to avoid nested anchors */}
        //       <Nav.Link
        //         as={Link}
        //         to={`/movie/${movie._id}`}
        //         onClick={() => handleClick(movie)}
        //       >
        //         <Image className="image" src={movie.imageUrl} thumbnail />
        //       </Nav.Link>
        //       <Carousel.Caption>
        //         <h3>{movie.title}</h3>
        //         <BsStarFill /> {Math.round(movie.avgRating*10)/10} &nbsp;&nbsp; {movie.releaseDate}
        //       </Carousel.Caption>
        //     </Carousel.Item>
        //   ))}
        // </Carousel>
      );
    }

export default Cart;