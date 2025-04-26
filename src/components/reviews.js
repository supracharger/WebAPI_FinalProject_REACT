import React, { useState } from 'react';
import { submitReview } from '../actions/movieActions';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

function Reviews(info) {
    info = JSON.parse(JSON.stringify(info)).children;
    const [details, setDetails] = useState({
        review: '',
        rating: 5,
        movieId: info._id,
        username: info.username,
    });

    const dispatch = useDispatch();

    const updateDetails = (event) => {
        setDetails({
          ...details,
            [event.target.id]: event.target.value
        });
    };

    const addReview = () => {
        var det = JSON.parse(JSON.stringify(details));
        det.username = info._username;
        // var det = {username: info._username,
        //     ...details
        // };
        dispatch(submitReview(details));
    };

    return (
        <div>
            <Form>
                <Form.Group controlId="review">
                    <Form.Label>Review</Form.Label>
                    <Form.Control onChange={updateDetails} value={details.review} type="text" placeholder="Review" />
                </Form.Group>

                <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select onChange={updateDetails} value={details.rating}>
                        {[...Array(5)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                            {i + 1}
                            </option>
                        ))}
                    </Form.Select>
                    {/* <Form.Control onChange={updateDetails} value={details.rating} type="text" placeholder="Rating" /> */}
                </Form.Group>
                <Button onClick={addReview}>Add Review</Button>
            </Form>
        </div>
    );
}

export default Reviews;