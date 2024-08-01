import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import './App.css';

type FormData = {
  fullname: string;
  email: string;
  message: string;
};

const MyForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className='contact-us'>
      <form className='contact-form' onSubmit={handleSubmit(onSubmit)}>
        <h1>Contact Us</h1>
      
        <div>
          <input id="fullname" {...register('fullname', { required: true })} placeholder="Full Name" />
          {errors.fullname && <p>Name is required</p>}
        </div>

        <div>
          <input id="email" placeholder='Email' {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
          {errors.email && <p>Valid email is required</p>}
        </div>
        
        <div>
          <textarea 
            placeholder='Message' 
            {...register('message', { required: true, minLength: 10 })} 
          />
          {errors.message && errors.message.type === 'required' && <p>Message is required</p>}
          {errors.message && errors.message.type === 'minLength' && <p>Message must be at least 10 characters long</p>}
        </div>

        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default MyForm;
