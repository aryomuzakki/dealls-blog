"use client";

import Link from "next/link";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { ChevronRight, Search, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import BlogPagination from "./BlogPagination";
import { Input } from "./ui/input";
import getBlogs from "@/service/getBlogs";
import SideBlogsCategory from "./SideBlogsCategory";
import BlurFade from "./ui/blur-fade";
import GradualSpacing from "./ui/gradual-spacing";

const HomePage = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [blogs, setBlogs] = useState();
  const [metadata, setMetadata] = useState({});

  const searchParams = useSearchParams();
  const p = parseInt(searchParams.get("p")) || 1;
  const q = searchParams.get("search");

  useEffect(() => {

    getBlogs({ page: p, ...q ? { search: q } : {} }).then(result => {
      setBlogs(result?.data?.data || []);
      setMetadata(result?.data?.metadata || {});
    }).catch(err => console.error(err.message));

    setPage(p);
    setQuery(q || "");

  }, [p, q])

  const goToPage = (pageTarget) => {
    const targetURL = new URLSearchParams(searchParams)
    targetURL.set("p", pageTarget);
    setBlogs();
    router.push("?" + targetURL.toString());
  }

  const searchBlog = (ev) => {
    ev.preventDefault();
    const searchQuery = ev.target.search.value;
    if (searchQuery === q) {
      return;
    }
    setBlogs();
    router.push("?search=" + searchQuery);
  }

  return (
    <div className="flex flex-col justify-center lg:flex-row gap-8 mx-auto">
      <div className="lg:w-2/3">
        <h2 className="text-2xl font-semibold mb-6 ">
          <GradualSpacing
            className="-tracking-[0.015em]"
            text="Artikel Terbaru"
          />
        </h2>
        {!blogs && !q && (
          <div className="flex gap-4 mb-8">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-20" />
          </div>
        )}
        {(blogs || q) && (
          <BlurFade className="mt-3">
            <form className="flex gap-4 mb-8" onSubmit={searchBlog}>
              <div className="relative w-full">
                <Input type="text" name="search" placeholder="Cari artikel..." value={query} onChange={(ev) => setQuery(ev.target.value)} />
              </div>
              <Button variant="outline" className="">
                Cari
                <Search className="h-4 w-4 ml-2" />
              </Button>
              {typeof q === "string" && (
                <Button variant="outline" className=" hover:bg-destructive/70" onClick={(ev) => {
                  ev.preventDefault();
                  setQuery("");
                  router.push("/")
                }}>
                  Hapus
                  <XIcon className="h-3.5 w-3.5 ml-2" />
                </Button>
              )}
            </form>
          </BlurFade>
        )}

        <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">

          {!blogs && [...Array(10).keys()].map(key => (
            <Card key={key} className="flex flex-col overflow-hidden">
              <Skeleton className="h-48 min-w-80 w-full" />
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-7 w-3/4" />
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex justify-end">
                <Skeleton className="h-7 w-24" />
              </CardFooter>
            </Card>
          ))}
          {blogs && blogs.length === 0 && (
            <p className="italic text-muted text-center md:col-span-2">Tidak ada artikel untuk ditampilkan :(</p>
          )}
          {blogs && blogs.length > 0 && blogs.map((blog, idx) => (
            <Card key={idx} className="flex flex-col overflow-hidden">
              <BlurFade delay={0.25 + idx * 0.05} duration={0.6} inView inViewMargin="-10px" className="flex flex-col h-full" >
                <Image
                  src={`https://picsum.photos/seed/${blog.slug}/400/200`}
                  alt={blog?.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"

                />
                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl">

                    {blog.title}</CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  <Button asChild>
                    <Link href={`/blog/${blog.slug}`} onClick={() => {
                      const siblingBlogsData = [
                        blogs[--idx] ?? {},
                        blogs[++idx] ?? {},
                      ]
                      window.localStorage.setItem("siblingBlogs", JSON.stringify(siblingBlogsData));
                    }}>
                      Baca Selengkapnya
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </BlurFade>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <BlogPagination currentPage={page} totalPage={metadata.total_pages} goToPage={goToPage} />
        </div>
      </div>

      <SideBlogsCategory />
    </div>
  )
}

export default HomePage