import Head from "next/head";
import { Inter } from "next/font/google";
import FileUploadPage from "./components/fileupload";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>ACME HR System</title>
        <meta
          name="description"
          content="Calculates the total to be paid to a server."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <FileUploadPage />
      </main>
    </>
  );
}
