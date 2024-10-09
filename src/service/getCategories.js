"use server"

const getCategories = async () => {
  try {

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/categories",
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

    const categories = await response.json();

    return categories;

  } catch (err) {
    console.error(err.message);
  }
}

export default getCategories