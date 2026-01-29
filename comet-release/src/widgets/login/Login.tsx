import { LoginLogo, LoginForm } from './ui'

export default function Login() {
    return (
        <div className="flex flex-col lg:flex-row-reverse w-full justify-center lg:justify-start items-center min-h-screen py-16 px-4 lg:p-20 gap-20">
            <LoginLogo />
            <LoginForm />
        </div>
    )
}
