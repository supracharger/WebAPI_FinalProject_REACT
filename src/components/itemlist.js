import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, itemAdd } from "../actions/ItemActions";
import { Link, useNavigate } from 'react-router-dom';
import { Image, Nav, Carousel, Table } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';

function ItemList() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.item.items);
    const navigate = useNavigate();

    // Memoize the movies array
    const memoizeditems = useMemo(() => {
        return items;
    }, [items]);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    var cart = localStorage.getItem('cart');
    if (!cart) 
      cart = [];
    else
      cart = JSON.parse(cart);

    // const handleSelect = (selectedIndex) => {
    //     // Use memoizedMovies here
    //     dispatch(setMovie(memoizeditems[selectedIndex]));
    // };
    const toCheckout = () => {
      navigate('/cart');
    }
    const toCart = (item) => {
        // dispatch(itemAdd(item));
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        navigate('/itemlist');
    };
    // return <div>{JSON.stringify(items)}</div>
    if (!memoizeditems) { // Use memoizedItems here
        return <div>Loading....</div>;
    }

    return (
      <div>
        <h2>Products</h2>
        <Table>
          {memoizeditems.map((itm) => {
            var id = String(itm._id);
            var incart = cart.includes(id);
            var PassId = () => toCart(id);
            return (
            <tr>
              <td><h3>{itm.imgurl}</h3></td>
              <td>
                <h3>{itm.name}</h3>
                <button onClick={(!incart) ? PassId : toCheckout}>
                  {(!incart) ? "ADD TO CART" : "CHECKOUT"}
                </button>
              </td>
              <td><h3>${itm.price}</h3></td>
            </tr>
          )})}
        </Table>
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

export default ItemList;