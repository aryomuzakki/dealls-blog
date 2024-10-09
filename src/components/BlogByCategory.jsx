import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import BlurFade from "./ui/blur-fade"

const BlogByCategory = ({ category, blogs }) => {
  return (
    <Card className="flex-grow sm:min-w-80 md:min-w-60 lg:min-w-0">
      <CardHeader className="pb-3">
        <CardTitle>
          <BlurFade delay={0.4} className="mt-3">
            {category.name}
          </BlurFade>
        </CardTitle>
      </CardHeader>
      <CardContent >
        <ul className="space-y-2">
          {blogs && blogs.length > 0 && blogs.map((blog, idx) => (
            <li key={idx}>
              <BlurFade delay={0.4 + idx * 0.15} className="flex items-center gap-2 mt-3">
                <Image
                  src={`https://picsum.photos/seed/${blog.slug}/100/100`}
                  alt={blog.title}
                  width={50}
                  height={50}
                  className="w-12 h-10 object-cover rounded"
                />
                <Link href={`/blog/${blog.slug}`} className="text-primary hover:underline">
                  {blog.title}
                </Link>
              </BlurFade>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default BlogByCategory