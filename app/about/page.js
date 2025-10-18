import axios from "axios";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const https = require("https");

const agent = new https.Agent({ rejectUnauthorized: false });

async function getAboutPage() {
  const res = await axios.get(
    "https://portfolio-app.lndo.site/jsonapi/node/basic_page?include=field_image",
    { httpsAgent: agent }
  );

  const pageData = res.data.data.find(
    (p) => p.attributes.title === "About Me"
  )?.attributes;

  const included = res.data.included || [];
  const imageRel = res.data.data.find(
    (p) => p.attributes.title === "About Me"
  )?.relationships?.field_image?.data?.id;

  const imageObj = included.find((item) => item.id === imageRel);
  const imageUrl = imageObj ? imageObj.attributes.uri.url : null;

  return { ...pageData, imageUrl };
}

export default async function About() {
  const page = await getAboutPage();

  if (!page) {
    return <p>About page not found</p>;
  }

  const skills = ["React.js", "Next.js", "Drupal", "Tailwind CSS", "TypeScript"];

  return (
    <main className="min-h-screen bg-background text-foreground font-mono flex flex-col items-center justify-center p-5">
      <Card className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-6 p-6">
        {page.imageUrl && (
          <div className="w-full md:w-1/3">
            <Image
              src={`https://portfolio-app.lndo.site${page.imageUrl}`}
              alt={page.title}
              width={300}
              height={300}
              className="rounded-lg border border-border shadow-lg"
              unoptimized
              priority={true}
            />
          </div>
        )}
        <CardContent className="w-full md:w-2/3 flex flex-col gap-4">
          <CardHeader className="text-3xl font-bold text-primary mb-4">
            {page.title}
          </CardHeader>
          <div
            className="prose prose-invert text-lg mb-4"
            dangerouslySetInnerHTML={{
              __html: page.body?.value || "<p>No content yet</p>",
            }}
          />
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <ul className="list-inside flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li key={skill} className="bg-primary/20 text-primary px-2 py-1 rounded">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex gap-4">
            <a href="https://github.com/daria" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/daria" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://twitter.com/daria" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

