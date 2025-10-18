import axios from "axios";
const https = require("https");

const agent = new https.Agent({ rejectUnauthorized: false });

export async function POST(req) {
  const { name, email, message } = await req.json();

  try {
    const res = await axios.post(
      "https://portfolio-app.lndo.site/jsonapi/contact_message/general_inquiry",
      {
        data: {
          type: "contact_message--general_inquiry",
          attributes: {
            subject: `Message from ${name}`,
            message: message,
            field_name: name,
            field_email: email,
          },
        },
      },
      {
        httpsAgent: agent,
        headers: { "Content-Type": "application/vnd.api+json" },
      }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error.response?.data || error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
