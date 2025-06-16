import '../styles/globals.css'; // ou seu arquivo de estilos global

export const metadata = {
  title: 'Expedição',
  description: 'Descrição do seu projeto',
   icons: {
    icon: '/LogoMotoboy2.png', // ou '/favicon.png'
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Aqui você pode colocar um Header, Footer, Providers, etc */}
        {children}
      </body>
    </html>
  );
}