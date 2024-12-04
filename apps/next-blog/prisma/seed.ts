import { hashPassword } from '@/lib/bcrypt'
import { uid } from '@/lib/util'
import { PrismaClient, User, Blog } from '@prisma/client'
const prisma = new PrismaClient()

const seed = async () => {
    const users: User[] = [
        {
            id: uid(),
            name: "Ravinder Reddy Kothabad",
            email: "developer.ravinder.reddy@gmail.com",
            verficationCode: null,
            password: await hashPassword("Itest*")
        }
    ]

    const blogs: Blog[] = [
        {
            id: uid(),
            title: "Key Golang Concepts You Should Learn as a Beginner Go Developer",
            content: "",
            isFree: true,
            authorId: users[0].id,
            publishedDate: new Date('2022-01-01'),
            coverPhoto: `https://picsum.photos/370/280?random=1`
        },
        {
            id: uid(),
            title: "DevOps and Automation",
            content: "With the rise of continuous integration and continuous deployment (CI/CD) in modern development workflows, DevOps and automation are essential for efficient, scalable systems. A DevOps-focused blog can explore tools, frameworks, and methodologies that streamline software delivery and operations. Readers can learn about popular DevOps tools like Docker, Kubernetes, Jenkins, and Terraform, as well as best practices for automating repetitive tasks. This blog is perfect for software engineers, system admins, and anyone interested in simplifying and scaling their infrastructure.",
            isFree: true,
            authorId: users[0].id,
            publishedDate: new Date('2022-12-01'),
            coverPhoto: `https://picsum.photos/370/280?random=2`

        },
        {
            id: uid(),
            title: "Cybersecurity Essentials",
            content: "As cyber threats become more sophisticated, cybersecurity has become a crucial aspect of both personal and professional tech landscapes. A cybersecurity-focused blog can provide readers with insights on securing their digital environments, preventing data breaches, and understanding the latest threats. Covering cybersecurity fundamentals like encryption, firewalls, ethical hacking, and secure coding practices, this blog can help readers build a strong foundation in protecting information and systems. It’s an essential read for IT professionals, developers, and tech enthusiasts alike.",
            isFree: true,
            authorId: users[0].id,
            publishedDate: new Date('2023-01-01'),
            coverPhoto: `https://picsum.photos/370/280?random=3`
        },
        {
            id: uid(),
            title: "Artificial Intelligence and Machine Learning",
            content: "AI and machine learning (ML) are transforming industries, from healthcare to finance and beyond. A blog dedicated to AI and ML can cover everything from the basics to advanced model-building techniques, making it accessible to newcomers and valuable for experienced data scientists. This blog can include tutorials on popular frameworks like TensorFlow and PyTorch, overviews of neural networks, and deep dives into algorithm optimization, helping readers get started or level up in AI.",
            isFree: true,
            authorId: users[0].id,
            publishedDate: new Date('2023-07-01'),
            coverPhoto: `https://picsum.photos/370/280?random=4`
        },
        {
            id: uid(),
            title: "Cloud Computing and Serverless Architecture",
            content: "As businesses move to cloud-based solutions, understanding cloud computing and serverless architecture has become an essential skill. A blog focused on cloud technologies can introduce readers to major cloud providers like AWS, Azure, and Google Cloud, explain services for storage, networking, and security, and provide step-by-step guides for creating serverless applications. This topic is ideal for developers, IT professionals, and those interested in learning more about cloud solutions to build flexible, cost-effective systems.",
            isFree: true,
            authorId: users[0].id,
            publishedDate: new Date('2024-08-01'),
            coverPhoto: `https://picsum.photos/370/280?random=5`
        }
    ]

    await prisma.user.createMany({ data: users })
    await prisma.blog.createMany({ data: blogs })
}




async function main() {
    await seed()
    console.log("😊 Seed successfull")
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })