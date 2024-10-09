"use server"

const getBlogs = async (query) => {
  try {

    const queryParams = new URLSearchParams({
      limit: 12,
      page: 1,
      ...query,
    })

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/articles?" + queryParams.toString(),
      {
        ...process.env.NODE_ENV === "development" ? {
          cache: "force-cache",
        } : {
          next: {
            revalidate: 3600
          }
        }
      }
    );

    const blogs = await response.json();

    return blogs;

  } catch (err) {
    console.error(err.message);
  }
}

export default getBlogs