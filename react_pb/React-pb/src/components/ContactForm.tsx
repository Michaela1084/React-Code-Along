import Button from "./Button"
import Input from "./Input"

import { useForm } from 'react-hook-form'
import { server_call } from "../api/server";
import { useDispatch, useStore } from "react-redux";
import { chooseName, chooseEmail, chooseAddress, choosePhone } from "../redux/slices/RootSlice";

// interface
interface ContactFormProps {
  id?: string,
  data?: {}
}

const ContactForm = (props:ContactFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data: any, event: any) => {
    console.log(`ID: ${props.id}`);
    if (props.id) {
      server_call.update(props.id, data)
      console.log(`Updated: ${ data.name } ${ props.id }`)
      setTimeout(() => {window.location.reload()}, 1000);
      event.target.reset()
    } else {
      // Use dispatch to update our state in our store
      dispatch(chooseName(data.name));
      dispatch(chooseEmail(data.email));
      dispatch(choosePhone(data.phone_number));
      dispatch(chooseAddress(data.address));

      server_call.create(store.getState())
      setTimeout( () => {window.location.reload()}, 1000);
    }
  }

  return (

    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Contact Name</label>
          <Input {...register('name')} name="name" placeholder="Name"/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input {...register('email')} name="email" placeholder="Email"/>
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number</label>
          <Input {...register('phone_number')} name="phone_number" placeholder="Phone Number"/>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <Input {...register('address')} name="address" placeholder="Address"/>
        </div>
        <div className="flex p-1">
          <Button
            className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
            >
              Submit
            </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm

// REWATCH THEORY SECTION OF REDUX VIDEO!!!!!!