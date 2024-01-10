"use client"

import { CSSProperties } from "react";
import Header from "../../components/OtherHeader";
import { fetchData } from "../../global/general";
import {useRouter, useSearchParams} from 'next/navigation'

enum FormActions {
  Login = 'Login',
  SignUp = 'Sign Up'
}

const styles: { [key: string]: CSSProperties } = {
  inputs: {
    border: "1px solid grey",
    borderRadius: "5px",
    lineHeight: "4vh",
    outline: "none",
    marginBottom: "2vh"
  }
}

export default function SignUpLogin() {

  const searchParams = useSearchParams()
  const router = useRouter()

  const title = searchParams.get('action') as string

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    switch (title) {
      case FormActions.Login:
        const data = await fetchData('login', { email, password })
        if (data.length > 0) {
          localStorage.setItem('currUserEmail', email);
          alert('Successfully logged in')
          router.push('/')
        } else {
          alert('Login failed');
          throw new Error('Login failed');
        }
        break;

      case FormActions.SignUp.replace(/\s+/g, ''):
        fetchData('createAcc', { email, password }).then(() => {
          localStorage.setItem('currUserEmail', email);
          router.push('/')
        })
        break;

      default:
        alert('Invalid form action');
    }
  };

  return <>
    <Header />
    <form style={{ margin: "8vh 4vw", textAlign: "center" }} onSubmit={handleSubmit}>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <div>
        <label>Email </label>
        <input name="email" type="text" style={styles.inputs} />
      </div>
      <div>
        <label>Password </label>
        <input name="password" type="text" style={styles.inputs} />
      </div>
      <button type="submit" style={{
        marginTop: "5vh", width: "80%", padding: "1vh", backgroundColor: "blue",
        color: "white", fontSize: "20px", fontWeight: "bold"
      }}>{title}</button>
    </form>
  </>
}