import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [confirmPW, setConfirmPW] = useState('');

  const { signup } = useContext(AuthContext);

  const handleInput = (e) => setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPW !== formState.password) return;
    signup(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className='fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box'>
        <legend className='fieldset-legend'>Sign Up</legend>

        <label className='fieldset-label'>First name</label>
        <input
          className='input '
          type='text'
          required
          placeholder='John'
          name='firstName'
          onChange={handleInput}
          value={formState.firstName}
        />
        <label className='fieldset-label'>Last Name</label>
        <input
          className='input '
          type='text'
          required
          placeholder='Malkovich'
          name='lastName'
          onChange={handleInput}
          value={formState.lastName}
        />

        <label className='fieldset-label'>Email</label>
        <input
          className='input validator'
          type='email'
          required
          placeholder='mail@site.com'
          name='email'
          onChange={handleInput}
          value={formState.email}
        />
        <div className='validator-hint hidden'>Enter valid email address</div>

        <label className='fieldset-label'>Password</label>
        <input
          type='password'
          className='input validator'
          required
          placeholder='Password'
          minLength='8'
          name='password'
          pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\#\?!\@\$%^&*\-]).{8,}'
          title='Must be more than 8 characters, including number, lowercase letter, uppercase letter and a special character (#?!@$ %^&*-)'
          onChange={handleInput}
          value={formState.password}
        />
        <p className='validator-hint hidden'>
          Must be more than 8 characters, including
          <br />
          At least one number
          <br />
          At least one lowercase letter
          <br />
          At least one uppercase letter
          <br />
          At least one special character (#?!@$ %^&*-)
        </p>

        <label className='fieldset-label'>Confirm Password</label>
        <input
          type='password'
          className={`input ${formState.password === confirmPW ? 'confirm-valid' : 'confirm-invalid'}`}
          required
          placeholder='Confirm Password'
          title='Must match Password'
          onChange={(e) => setConfirmPW(e.target.value)}
          value={confirmPW}
        />
        {confirmPW && confirmPW !== formState.password && (
          <p className='validator-hint hidden'>Passwords don&apos;t match.</p>
        )}

        <button disabled={!confirmPW || confirmPW !== formState.password} className='btn btn-neutral mt-4'>
          Signup
        </button>
      </fieldset>
    </form>
  );
};

export default Signup;
