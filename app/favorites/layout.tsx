export const metadata = {
    title: 'Favorites',
    description: 'User favorites movies',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <span>{children}</span>;
}
