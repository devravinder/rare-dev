import BlogList from "@/components/BlogList";
import { Metadata } from "next";


const someApiCall = async () => {
  return ({
    title: "Tech Blog",
    desription: "News about technologies"
  })
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await someApiCall()

  return {
    title: data.title,
    description: data.desription,
    openGraph: {
      title: data.title,
      images: [
        {
          url: '/notes.png',
        },
      ],
    },
  };
}

export default function Home() {
  return <>
    <div className="flex flex-col gap-8">
      <BlogList/>
    </div>
  </>
}
