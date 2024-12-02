import { formatDate } from '@/lib/util'
import { Blog } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// https://picsum.photos/200/300?random=1

type BlogCardProps = Blog
export default function BlogCard({title, coverPhoto, content, publishedDate}:BlogCardProps) {

    return (
        <div className='flex flex-row gap-10 w-full'>
            <Image src={coverPhoto!} alt="Blog Pic" width={370} height={280} />
            <div className="flex flex-col gap-2">
                <Link href={`/blogs/id`}>
                <div className="text-3xl font-semibold hover:text-blue-700 transition-all">
                    {title}
                </div>
                </Link>
                <div className="text-slate-500 font-lora italic">
                    {formatDate(publishedDate!)}
                </div>
                <div className="leading-8 font-lora text-lg line-clamp-5">
                    {content}
                </div>
            </div>
        </div>
    )
}
