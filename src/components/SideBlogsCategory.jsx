"use client"

import { useEffect, useState } from "react";
import BlogByCategory from "./BlogByCategory";
import getCategories from "@/service/getCategories";
import getBlogs from "@/service/getBlogs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import GradualSpacing from "./ui/gradual-spacing";
import BlurFade from "./ui/blur-fade";

const SideBlogsCategory = () => {

  const [categories, setCategories] = useState();
  const [blogsCategory, setBlogsCategory] = useState();

  useEffect(() => {

    getCategories().then(result => {
      setCategories(result?.data.slice(0, 3) || []);
    }).catch(err => console.error(err.message));

  }, [])

  useEffect(() => {

    if (categories && categories.length > 0) {
      const blogsCatObj = {};
      Promise.all(categories.map(async (category) => {
        const blogsCat = await getBlogs({ category_id: category.id, limit: 5 });
        blogsCatObj[`${category.id}`] = blogsCat.data.data;
      })).then(() => {
        setBlogsCategory(blogsCatObj);
      }).catch(err => console.error(err.message));
    }

  }, [categories])

  return (
    <div className="">
      <h2 className="text-xl font-medium mb-6">
        <GradualSpacing
          className="-tracking-[0.01em]"
          text="Artikel Berdasarkan Kategori"
        />
      </h2>
      {(!categories || !blogsCategory) && [...Array(3).keys()].map(idx => (
        <Card key={idx} className="mb-6">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-2/5" />
            </CardTitle>
          </CardHeader>
          <CardContent >
            <ul className="space-y-2">
              {[...Array(5).keys()].map(jdx =>
                <li key={jdx} className="flex items-center gap-2">
                  <Skeleton className="w-12 h-10" />
                  <Skeleton className="h-5 w-4/5" />
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      ))}

      {categories && categories.length === 0 && (
        <p className="italic text-muted text-center md:col-span-2">Tidak ada artikel untuk ditampilkan :(</p>
      )}

      <div className="flex flex-wrap lg:flex-col gap-6">
        {categories && categories.length > 0 && blogsCategory && categories.map((category) => {
          return (
            <BlogByCategory key={category.id} category={category} blogs={blogsCategory[category.id]} />
          )
        })}
      </div>
    </div>
  )
}

export default SideBlogsCategory