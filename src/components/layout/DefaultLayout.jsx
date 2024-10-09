import Image from "next/image"
import { ThemeToggle } from "./ThemeToggle"
import WithNextThemes from "./WithNextThemes"
import Link from "next/link"
import { buttonVariants } from "../ui/button"
import WithProgressBar from "./WithProgressBar"
import BlurFade from "../ui/blur-fade"

const DefaultLayout = ({ children }) => {
  return (
    <>
      <WithNextThemes
        attribute="class"
        enableSystem
        disableTransitionOnChange
      >
        <WithProgressBar color="#3b82f6" shallowRouting />

        <div className="min-h-screen flex flex-col w-full">
          <header className="sticky top-0 z-30 flex min-h-14 items-center gap-4 border-b bg-muted px-4 sm:px-6 md:px-8">
            <BlurFade inView className="mt-3">
              <Link href="/" className="flex gap-2 items-center">
                <Image
                  src="/favicon-48x48.png"
                  alt="Dealls Blog"
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain"
                />
                <h1 className="text-2xl font-bold">Dealls Blog</h1>
              </Link>
            </BlurFade>

            <div className="ml-auto">
              <ThemeToggle />
            </div>

          </header>
          <main className="p-4 mx-auto sm:p-6 md:p-8 min-h-[calc(100vh_-_56px)]">
            {children}
          </main>
          <footer className="bg-muted py-6">
            <div className="container mx-auto px-4 text-center">
              <p>Copyright &copy; 2023 {" "}
                <Link href="/" className={buttonVariants({ variant: "link" }) + " px-0 py-0 ml-1 text-base"}>
                  Dealls Blog.
                </Link>
              </p>
            </div>
          </footer>
        </div>
      </WithNextThemes>
    </>
  )
}

export default DefaultLayout