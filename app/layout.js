import "./globals.css";

export const metadata = {
    title: "Todo App",
    description: "Created By Viral Gajera",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
