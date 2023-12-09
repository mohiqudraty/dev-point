/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxios/useAxiosPublic";
import useMembership from "../../Api/useMembership";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth/useAuth";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const {user} = useAuth()
  const axiosPublic = useAxiosPublic()
  const [error, setError] = useState('')
  const stripe = useStripe();
  const elements = useElements();
const {plan} = useMembership()
const [clientSecret, setClientSecret] = useState('')
const navigate = useNavigate()
const [myInfo, setMyInfo] = useState({})

// profile info ------
useEffect(() => {
  axiosPublic.get(`/users?email=${user?.email}`)
  .then(res => {
    // console.log(res.data);
    setMyInfo(res.data)
  })
},[axiosPublic, user?.email])




useEffect(() => {
  if (plan?.price) {
    axiosPublic
      .post('/create-payment-intent', { price: plan.price })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        console.error('Error creating payment intent:', error);
        // Handle the error, e.g., set an error state to display a message to the user
        setError('Failed to create payment intent');
      });
  }
}, [axiosPublic, plan.price]);


  const handlePayment = async (e) => {
    e.preventDefault();
      const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, Pay Money",
          cancelButtonText: "No, cancel!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            if(!stripe || !elements){
              return
          }
      
          const card = elements.getElement(CardElement)
      
          if(card == null){
              return null
          }
      
          const {error, paymentMethod} = stripe.createPaymentMethod({
              type:'card',
              card
          })
      if(error){
          console.log(error, "payment error");
          setError(error.message)
      }else{
          console.log(paymentMethod, "payment method");
          axiosPublic.put(`make-admin?id=${myInfo._id}`, {newRole: 'paid'})
          .then(res => {
              console.log(res.data);
              if(res.data.modifiedCount > 0){
                  swalWithBootstrapButtons.fire({
                      title: "Paid!",
                      text: "Payment Success!",
                      icon: "success"
                    });
                    navigate('/')
              }
          })
          
          setError('')
      }
          
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your User Role Not Update :)",
              icon: "error"
            });
          }
        });
      
  

  };
  return (
    <form onSubmit={handlePayment} className="mt-10 max-w-4xl mx-auto">
      <CardElement className="h-8"
        options={{
          style: {
            base: {
              fontSize: "20px",
              color: "#424770",
              "::placeholder": {
                color: "#000",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button type="submit" className="btn bg-slate-900 text-white mt-3 block mx-auto" disabled={!stripe}>
        Pay
      </button>
      <p className="text-red-600 text-sm">{error}</p>
    </form>
  );
};

export default CheckoutForm;
