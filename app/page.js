import axios from "axios";
import Image from "next/image";
const https = require("https");

const agent = new https.Agent({ rejectUnauthorized: false });

async function getHomePage() {
  const res = await axios.get(
    "https://portfolio-app.lndo.site/jsonapi/node/basic_page?include=field_image",
    { httpsAgent: agent }
  );
  const data = res.data.data[0]?.attributes || {};
  const included = res.data.included || [];

  const imageRel = res.data.data[0]?.relationships?.field_image?.data?.id;
  const imageObj = included.find((item) => item.id === imageRel);
  const imageUrl = imageObj ? imageObj.attributes.uri.url : null;

  return { ...data, imageUrl };
}

export default async function Home() {
  const page = await getHomePage();

  return (
    <main className="min-h-screen bg-background text-foreground font-mono flex flex-col items-center justify-center p-5">
      
      <h1 className="text-6xl md:text-7xl font-bold text-primary mb-8 text-center drop-shadow-lg">
        {page.title}
      </h1>

      {page.imageUrl && (
        <div className="mb-8 w-full max-w-lg">
          <Image
            src={`https://portfolio-app.lndo.site${page.imageUrl}`}
            alt={page.title}
            width={800}
            height={400}
            className="rounded-xl border border-border shadow-2xl"
            unoptimized
            priority
          />
        </div>
      )}

      <div
        className="prose prose-invert max-w-3xl text-lg [&>p]:mb-6"
        dangerouslySetInnerHTML={{
          __html: page.body?.value || "<p>No content yet</p>",
        }}
      />

      <div className="mt-8">
        <a
          href="#contact"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Get in Touch
        </a>
      </div>
    </main>
  );
}


