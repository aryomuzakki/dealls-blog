"use client"

import Link from 'next/link'
import parse from 'html-react-parser'
import { ChevronLeft, ChevronRight, CalendarClockIcon, Mail, Share2Icon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import localDayjs from '@/lib/localDayjs'
import SideBlogsCategory from './SideBlogsCategory'
import { SiFacebook, SiLinkedin, SiTelegram, SiWhatsapp, SiX } from '@icons-pack/react-simple-icons'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import GradualSpacing from './ui/gradual-spacing'
import BlurFade from './ui/blur-fade'

const BlogDetail = ({ blog }) => {

  const blogTitle = encodeURIComponent(blog.title + " | Dealls Blog");
  const blogURL = encodeURIComponent("https://dealls-blog.vercel.app/blog/" + blog.slug);

  const socialSharing = [
    {
      url: `https://www.facebook.com/sharer.php?u=${blogURL}`,
      icon: <SiFacebook className="h-4 w-4" />,
    },
    {
      url: `https://wa.me?text=${blogTitle} ${blogURL}`,
      icon: <SiWhatsapp className="h-4 w-4" />,
    },
    {
      url: `https://www.linkedin.com/shareArticle?url=${blogURL}&title=${blogTitle}`,
      icon: <SiLinkedin className="h-4 w-4" />,
    },
    {
      url: `https://twitter.com/intent/tweet?url=${blogURL}&text=${blogTitle}&via=DeallsBlog`,
      icon: <SiX className="h-4 w-4" />,
    },
    {
      url: `https://t.me/share/url?url=${blogURL}&text=${blogTitle}`,
      icon: <SiTelegram className="h-4 w-4" />,
    },
    {
      url: `mailto:?subject=${blogTitle}&body=${blogTitle} ${blogURL}`,
      icon: <Mail className="h-4 w-4" />,
    },
  ]

  let parsedJSON;
  try {
    parsedJSON = JSON.parse(blog.content)
  } catch (err) {
    parsedJSON = blog.content
  }

  const fixString = parsedJSON.replace("<html><head></head><body>", "").replace("</body></html>", "");

  const parsedContent = parse(fixString, {
    transform(reactNode) {
      if (reactNode.props?.style) {
        reactNode.props.style.fontFamily = undefined;
        if (reactNode.props.style.backgroundColor === "transparent") {
          reactNode.props.style.color = undefined;
        }
      }

      return reactNode;
    }
  });

  const [siblingBlogs, setSiblingBlogs] = useState();

  useEffect(() => {
    try {
      const sibBlogs = JSON.parse(window.localStorage.getItem("siblingBlogs"));
      setSiblingBlogs(sibBlogs);
    } catch (err) {
      console.error(err.message);
    }
  }, [])


  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <article className="prose dark:prose-invert prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
          <h1 className="mb-4">
            <GradualSpacing
              className="-tracking-[0.015em]"
              text={blog.title}
            />
          </h1>
          <BlurFade delay={0.25} >
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex gap-2 items-center">
                <CalendarClockIcon className="h-4 w-4" />
                <time dateTime={blog.created_at} className="whitespace-nowrap">
                  {localDayjs(blog.created_at).format("DD MMMM YYYY, HH:mm WIB")}
                </time>
              </div>
              <div className="flex gap-2">
                {blog?.categories?.length > 0 && blog?.categories?.map((category) => (
                  <Badge key={category.id} variant="secondary">
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={0.5}>
            <div>{blog?.content && parsedContent}</div>
          </BlurFade>
        </article>

        <BlurFade>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Bagikan Artikel Ini</h3>
            <div className="flex flex-wrap gap-3">
              {
                socialSharing.map((social, idx) => {
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={buttonVariants({ variant: "outline", size: "icon" })}
                    >
                      {social.icon}
                    </a>
                  )
                })
              }
              <Button
                variant="outline"
                size="icon"
                onClick={async () => {
                  try {
                    await navigator.share({
                      title: decodeURIComponent(blogTitle),
                      text: `${decodeURIComponent(blogTitle)} ${decodeURIComponent(blogURL)}`,
                      url: decodeURIComponent(blogURL),
                    });
                  } catch (err) {
                    console.error(err.message);
                  }
                }}
              >
                <Share2Icon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </BlurFade>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {!siblingBlogs && [...Array(2).keys()].map((idx) => {
            return (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className={`text-sm ${idx === 0 ? "" : " text-right"}`}>
                    {idx === 0 ? 'Sebelumnya' : 'Selanjutnya'}
                  </CardTitle>
                </CardHeader>
                <CardContent className={idx === 0 ? "" : "text-right flex justify-end items-end"}>
                  <Skeleton className="h-7 w-3/4" />
                </CardContent>
                <CardFooter className={idx === 0 ? "" : "justify-end"}>
                  <Skeleton className="h-7 w-24" />
                </CardFooter>
              </Card>
            )
          })}
          {siblingBlogs && siblingBlogs.map((blog, idx) => {
            if (!blog?.title) return;
            return (
              <Card key={idx} className={!blog?.title ? "col-start-2" : ""}>
                <CardHeader>
                  <CardTitle className="text-sm">
                    {idx === 0 ? 'Sebelumnya' : 'Selanjutnya'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold">{blog?.title}</h3>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href={`/blog/${blog?.slug}`}>
                      {idx === 0 ? (
                        <><ChevronLeft className="mr-2 h-4 w-4" /> Baca Sebelumnya</>
                      ) : (
                        <>Baca Selanjutnya <ChevronRight className="ml-2 h-4 w-4" /></>
                      )}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>

      <SideBlogsCategory />
    </div>
  )
}

export default BlogDetail