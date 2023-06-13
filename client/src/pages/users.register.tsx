import { Link } from 'react-router-dom';
import logo from '../assets/clicktrack.png';

const Register = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={logo} alt="clicktrack" />
        <h2 className="mt-10 text-center text-2xl font-black leading-9 tracking-tight text-purple-300">
          Make a <i className="px-1 font-normal not-italic">clicktrack</i>{' '}
          account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-purple-300"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@doe.com"
                autoComplete="email"
                required
                className="block w-full rounded-sm border-0 px-2 py-1.5 text-black ring-gray-300 duration-150 ease-out placeholder:text-gray-400 focus:rounded-lg focus:outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-semibold leading-6 text-purple-300"
              >
                Password
              </label>
              {/* <div className="text-sm">
                <a href="#" className="text-purple-300 hover:text-purple-500">
                  Forgot password?
                </a>
              </div> */}
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder=""
                required
                className="block w-full rounded-sm border-0 px-2 py-1.5 text-black ring-gray-300 duration-150 ease-out placeholder:text-gray-400 focus:rounded-lg focus:outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-purple-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-white">
          Already registered?{' '}
          <Link
            to="/users/login"
            className="font-semibold leading-6 text-purple-400 hover:text-purple-500"
          >
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
