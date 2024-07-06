import daihoiLogo from "@/../public/daihoiLogo.svg";
import Image from "next/image";

export default function AdminLogin() {
    return (
        <div className="h-screen w-screen pt-[100px]">
            <div className="bg-white w-full md:max-w-[470px] px-8 py-16 m-auto">
                <Image src={daihoiLogo} alt="" height={100} className="m-auto" />
                <h1 className="text-sky-600 font-semibold text-xl text-center mt-4">Chào mừng !</h1>
                <div className="container text-black block md:px-4 py-2 space-y-4 m-auto">
                    <div className="space-y-1">
                        <label htmlFor="email" className="block">Email</label>
                        <input type="email" name="email" className="w-full rounded-md" placeholder="Email"></input>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password" className="block">Mật khẩu</label>
                        <input type="password" name="password" className="w-full rounded-md" placeholder="Mật khẩu"></input>
                    </div>
                    <div className="py-2">
                        <button className="w-full bg-sky-600 hover:bg-sky-600/80 text-white p-3 rounded-md">Đăng nhập</button>
                    </div>
                </div>
            </div>
        </div>
    )
}