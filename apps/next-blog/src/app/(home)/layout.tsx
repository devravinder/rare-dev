import UserDetails from "@/components/UserDetails";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex flex-col gap-20">
      <div className="max-w-lg flex flex-col self-center">
        <UserDetails />
      </div>
      {children}
    </div>
  )
}
