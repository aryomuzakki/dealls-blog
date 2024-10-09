import BlogDetail from "@/components/BlogDetail";
import { parse as nodeParse } from "node-html-parser";

const getBlog = async (slug) => {
  try {

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/articles/" + slug,
      {
        ...process.env.NODE_ENV === "development" ? {
          cache: "force-cache",
        } : {
          next: {
            revalidate: 300
          }
        }
      }
    );

    const blog = await response.json();

    return blog;
  } catch (error) {
    console.error(error.message);
  }
}

export async function generateMetadata({ params }) {

  const blog = (await getBlog(params.slug)).data;

  let parsedJSON;
  try {
    parsedJSON = JSON.parse(blog.content)
  } catch (err) {
    parsedJSON = blog.content
  }

  const fixString = parsedJSON.replace("<html><head></head><body>", "")?.replace("</body></html>", "");

  const desc = nodeParse(fixString);

  const appTitle = "Dealls Blog";
  const title = blog.title + " | " + appTitle;
  const description = desc?.firstChild?.textContent + "... Selengkapnya di " + appTitle;
  const siteURL = "https://dealls-blog.vercel.app/blog/" + blog.slug;
  const image = {
    url: `https://picsum.photos/seed/${blog.slug}/400/200`,
    width: 400,
    height: 200,
  }

  const metadataObj = {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteURL,
      siteName: appTitle,
      images: [
        image
      ],
      locale: "id_ID",
      type: "article",
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      url: siteURL,
      images: [
        image.url
      ],
    },
  }
  return metadataObj
}

export default async function Page({ params }) {

  const blog = (await getBlog(params.slug));

  return (
    <div>
      <BlogDetail blog={blog.data} />
    </div>
  )
}

