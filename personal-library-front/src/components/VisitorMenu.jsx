import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { useState } from 'react';

const VisitorMenu = () => {
  const { login } = useContext(AuthContext);
  const [formState, setFormState] = useState({ email: '', password: '' });

  const handleInput = (e) => setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formState);
  };

  return (
    <>
      <nav>
        <ul className='menu menu-vertical sm:menu-horizontal bg-base-200 rounded-box'>
          <li>
            <Link to={'/signup'}>Sign Up</Link>
          </li>
          <li>
            <button onClick={() => document.getElementById('my_modal_1').showModal()}>Login</button>
          </li>
        </ul>
      </nav>
      <dialog id='my_modal_1' className='modal'>
        <form method='dialog' onSubmit={handleSubmit}>
          <fieldset className='fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box'>
            <legend className='fieldset-legend'>Login</legend>

            <label className='fieldset-label'>Email</label>
            <input
              type='email'
              className='input'
              placeholder='Email'
              name='email'
              value={formState.email}
              onChange={handleInput}
            />

            <label className='fieldset-label'>Password</label>
            <input
              type='password'
              className='input'
              placeholder='Password'
              name='password'
              value={formState.password}
              onChange={handleInput}
            />

            <div className='mt-3 text-right'>
              <button className='btn btn-neutral  mr-5' type='submit'>
                Login
              </button>
              <button
                className='btn btn-neutral'
                type='button'
                onClick={() => document.getElementById('my_modal_1').close()}
              >
                Close
              </button>
            </div>
          </fieldset>
        </form>
      </dialog>
    </>
  );
};

export default VisitorMenu;
