import axios from "axios";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
const https = require("https");

const agent = new https.Agent({ rejectUnauthorized: false });

async function getProjects() {
  const res = await axios.get(
    "https://portfolio-app.lndo.site/jsonapi/node/project?include=field_image",
    { httpsAgent: agent }
  );

  const data = res.data.data || [];
  const included = res.data.included || [];

  return data.map((proj) => {
    const imageRel = proj.relationships?.field_image?.data?.id;
    const imageObj = included.find((item) => item.id === imageRel);
    const imageUrl = imageObj ? imageObj.attributes.uri.url : null;

    return {
      id: proj.id,
      title: proj.attributes.title,
      body: proj.attributes.body?.value || "",
      imageUrl,
    };
  });
}

export default async function Projects() {
  const projects = await getProjects();

  if (!projects.length) {
    return <p>No projects found</p>;
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-mono flex flex-col items-center justify-center p-5 gap-6">
      <h1 className="text-5xl font-bold text-primary mb-6">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <Card key={proj.id} className="flex flex-col">
            {proj.imageUrl && (
              <Image
                src={`https://portfolio-app.lndo.site${proj.imageUrl}`}
                alt={proj.title}
                width={400}
                height={200}
                className="rounded-t-lg border-b border-border shadow-lg"
                unoptimized
              />
            )}
            <CardContent>
              <CardHeader className="text-xl font-bold mb-2">{proj.title}</CardHeader>
              <div
                className="prose prose-invert text-sm"
                dangerouslySetInnerHTML={{ __html: proj.body }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

