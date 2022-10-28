import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const [amount, setAmount] = useState(500);

const makePayment = async (token) => {
    const body = {
        token,
        amount,
        plan_id: "6343fdf4e8cfbdf2c24a0cd3"
    };
    const headers = {
        "Content-Type": "application/json"
    };

    // change bearer token
    const res = await axios.post(
        "http://localhost:5000/api/subscription",
        body,
        {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjMzOTk2NzU2YjdmZDU4OTFhYzQyYWQ5IiwiaWF0IjoxNjY1NjUzMzU0LCJleHAiOjE2NjU2NjA1NTR9.GAwryHwa8S4ciWlqoK7ytpOBW8yc0qEOFeNo9q85qOc`
            }
        }
    );

    console.log(res);

    // return fetch("http://localhost:5000/api/subscription", {
    //     method: "POST",
    //     headers,
    //     body: JSON.stringify(body)
    // })
    //     .then((response) => {
    //         console.log(response);
    //         const {status} = response;
    //         console.log("STATUS", status);
    //     })
    //     .catch((error) => console.log(error));
};

return (
    <div>
        <div>Payment Page</div>
        <StripeCheckout
            stripeKey=""
            token={makePayment}
            name="Buy Subscription"
            amount={amount * 100}
        />
    </div>
);
