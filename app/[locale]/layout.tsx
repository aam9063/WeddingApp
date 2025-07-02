import type { Metadata } from 'next';
import { montserrat } from '@/styles/fonts';
import './global.css';
import Footer from '@/components/footer';
import React, {ReactNode} from 'react';
import Navbar from '@/components/Navbar';
import {NextIntlClientProvider} from "next-intl";

export const metadata: Metadata = {
    title: 'Patri y Albert',
    description: 'Bienvenidos a la boda del año, a la boda de Patri y Albert',
    icons: {
        icon: '/aya-logo-w-namest.svg',
    },
};

interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    };
}

export default async function RootLayout({ children, params }: { children: ReactNode, params: { locale: string } }) {

    const messages = (await import(`@/messages/${params.locale}.json`)).default;

    return (
        <html lang={params.locale}>
        <body className={`${montserrat.className} `}>
        <NextIntlClientProvider messages={messages}>

            <Navbar/>
            <main className="w-full flex-grow mt-[78px]">
                {children}
            </main>
            <Footer/>

        </NextIntlClientProvider>

        </body>
        </html>
    );
}