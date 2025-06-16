import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    const isLoginPage = request.nextUrl.pathname.startsWith("/login");

    if (!token && !isLoginPage) {
        // Se não houver token e não estiver na página de login, redireciona para a página de login
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && isLoginPage) {
        // Se houver token e estiver na página de login, redireciona para a página inicial
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/motoboys/:path*',
        '/users/:path*',
        '/cadastroMotoboy/:path*',
        '/cadastros/:path*'
    ],
};