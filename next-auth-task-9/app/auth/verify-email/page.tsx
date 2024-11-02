"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const EmailVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const router = useRouter();
  const email = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('email') : '';
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus the next input field if the current one is filled
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const otpCode = otp.join('');
    if (otpCode.length !== 4) {
      setError('OTP must be a 4-digit code');
      return;
    }

    const res = await fetch('https://akil-backend.onrender.com/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, OTP: otpCode }),
    });

    if (res.ok) {
      setMessage('Email verified successfully! You can now login.');
      router.push('/auth/signin');
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  const handleResend = async () => {
    setError('');
    setMessage('');
    setIsResendDisabled(true);
    setTimer(30);

    const res = await fetch('https://akil-backend.onrender.com/resend-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setMessage('A new OTP has been sent to your email.');
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <div 
      className="container mx-auto rounded-lg shadow-lg" 
      style={{ 
        width: '720px', 
        height: '850px', 
        top: '108px', 
        left: '-22px', 
        padding: '184px 155px 183px 156px', 
        gap: '0px', 
        opacity: 1, 
        backgroundColor: 'white' 
      }}
    >
      <div 
        className="mx-auto" 
        style={{ 
          maxWidth: '409px', 
          height: '483px', 
          top: '184px', 
          left: '156px', 
          gap: '45px', 
          opacity: 1 
        }}
      >
        <h1 className="text-3xl text-blue-950 font-bold text-center mb-6">Verify Email</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        <p className="text-center mb-6">
          We have sent a verification code to the email address you provided. 
          To complete the verification process, please enter the code here:
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="mt-1 p-3 border border-blue-900 rounded-lg w-16 text-center"
                required 
                placeholder='0'
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
          <div className="mb-4 text-center">
            <p>You can request to resend the code in {timer > 0 ? `0:${timer < 10 ? `0${timer}` : timer}` : 'now'}</p>
            <button
              type="button"
              onClick={handleResend}
              className={`px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 ${isResendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isResendDisabled}
            >
              Resend Code
            </button>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-900 text-white rounded-[20px] hover:bg-blue-950 w-full"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};


export default EmailVerification;