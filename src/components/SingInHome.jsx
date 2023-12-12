import { Link } from 'react-router-dom'

const SignInHome = () => {
  return (
    <>
      <div className=" flex flex-col justify-end items-center h-2/5">
        <p className="text-6xl">Social Media Clone </p>
      </div>
      <div className="flex justify-center mt-5">
        <Link to={'/login'} className="btn btn-accent mx-16 ">
          {' '}
          login{' '}
        </Link>
        <Link to={'/signup'} className="btn btn-accent mx-16 ">
          {' '}
          sign up{' '}
        </Link>
      </div>
    </>
  )
}
export default SignInHome
